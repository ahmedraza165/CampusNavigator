import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {base_url} from "@/lib/helpers";
import {db} from "@/lib/db";


export async function POST(req: NextRequest) {
    const body = await req.json();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: "2023-10-16",});
    const authSession = await getServerSession(authOptions);


    if (!authSession?.user) {
        return NextResponse.json({
            error: {
                code: 'no-success',
                message: 'Your are not signed in'
            }

        }, {status: 401})
    }

    let stripeId = '';



    if (!authSession?.user.stripeCustomerId) {
        const stripeCustomer: Stripe.Customer = await stripe.customers.create({
            email: authSession?.user.email!,
            name: authSession?.user.firstName! + ' ' + authSession?.user.lastName!,
        });


        stripeId = stripeCustomer.id

        // Update user with Stripe customer ID
        await db.user.update({
            where: {id: authSession?.user.id},
            data: {
                stripeCustomerId: stripeCustomer.id,
            },
        });
    }


    console.log({stripeId: authSession})


    const checkoutSession: any = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: authSession?.user.stripeCustomerId || stripeId,
        customer_update: {
            address: "auto",
        },
        line_items: [
            {
                price: body.productId,
                // For metered billing, do not pass quantity
                quantity: 1
            }
        ],
        success_url: `${base_url}/result?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${base_url}/result?session_id={CHECKOUT_SESSION_ID}&success=false`,
        subscription_data: {
            metadata: {
                payingUserId: authSession?.user.id
            }

        }

    });

    if (!checkoutSession) {
        return NextResponse.json({
            error: {
                code: 'stripe-error',
                message: 'Could not create checkout session'
            },

        }, {status: 500})
    }

    return NextResponse.json({session: checkoutSession}, {status: 200})
}

// subscription_data: {
//     trial_from_plan: true,
// },
// success_url: `${'/'}/success`,
//     cancel_url: `${'/'}/business-setup`