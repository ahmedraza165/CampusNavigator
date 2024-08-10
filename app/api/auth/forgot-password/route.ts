// Server-side code
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const body: { email: string } = await req.json();
        const { email } = body;

        const existingUserEmail = await db.user.findUnique({
            where: { email: email },
        });

        if (!existingUserEmail) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const verificationToken = generateVerificationToken();
        const verificationTokenExpires = new Date();
        verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 1);

        await db.user.update({
            where: { email: email },
            data: {
                emailVerificationToken: verificationToken,
                emailVerificationTokenExpires: verificationTokenExpires,
            },
        });

        const verificationLink = `${process.env.BASE_API_URL}/update-password/?token=${verificationToken}`;
        sendVerificationEmail(email, verificationLink);

        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}
