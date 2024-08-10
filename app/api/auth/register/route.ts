import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userSchema } from "@/lib/schema";
import Stripe from "stripe";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/email"; // Import email utility functions

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        await userSchema.validate(body);

        // Check if email already exists
        const existingUserEmail = await db.user.findUnique({
            where: { email: email },
        });

        if (existingUserEmail) {
            return NextResponse.json(
                {
                    user: null,
                    message: "User with this email already exists.",
                },
                { status: 409 }
            );
        }

        // Insert new user
        body.password = await hash(password, 10);
        delete body.confirmPassword;
        const currentDate = new Date();
        const trialDate = new Date(currentDate);
        trialDate.setDate(currentDate.getDate() + Number(process.env.TRIAL_DAY) || 14);
        body.trial_end = trialDate;

        // Generate verification token and expiration date
        const verificationToken = generateVerificationToken();
        const verificationTokenExpires = new Date();
        verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 1); // Set expiration time to 1 hour from now

        // Create new user with verification token details
        const newUser: any = await db.user.create({
            data: {
                ...body,
                emailVerified: false,
                emailVerificationToken: verificationToken,
                emailVerificationTokenExpires: verificationTokenExpires,
            },
        });


        // Create verification link
        const verificationLink = `${process.env.BASE_API_URL}/verify-email?token=${verificationToken}`;
        console.log(verificationLink);
        // Send verification email
        sendVerificationEmail(newUser.email, verificationLink);

        // Create new organization
        const newOrganization = await db.organization.create({
            data: {
                name: body.firstName, // Use user's first name as organization name
                owner_id: newUser.id,
            },
        });

        console.log({newOrganization});

        // Create Stripe customer
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: "2023-10-16",});

        const stripeCustomer: Stripe.Customer = await stripe.customers.create({
            email: newUser.email!,
            name: newUser.firstName! + ' ' + newUser.lastName!,
        });

        // Update user with Stripe customer ID
        await db.user.update({
            where: { id: newUser.id },
            data: {
                stripeCustomerId: stripeCustomer.id,
            },
        });

        // Omit password field from response
        const { password: newPassword, ...rest } = newUser;

        // Return response
        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ user: null, message: "Something went wrong!", error: error.message }, { status: 500 });
    }
}
