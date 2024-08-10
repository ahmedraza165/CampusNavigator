import Stripe from "stripe";

import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2023-10-16",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature")!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            // On error, log and return the error message.
            if (err! instanceof Error) console.log(err);
            console.log(`❌ Error message: ${errorMessage}`);

            return NextResponse.json(
                {
                    error: {
                        message: `Webhook Error: ${errorMessage}`,
                    },
                },
                {status: 400}
            );
        }

        // Successfully constructed event.
        console.log("✅ Success:", event.id);

        // getting to the data we want from the event
        const subscription = event.data.object as Stripe.Subscription;
        console.log(subscription)

        switch (event.type) {
            case "customer.subscription.created":
                console.log("created", event.type)
                await db.user.update({
                    // Find the customer in our database with the Stripe customer ID linked to this purchase
                    where: {
                        stripeCustomerId: subscription.customer as string,
                    },
                    // Update that customer so their status is now active
                    data: {
                        isActive: true,
                        subscriptionId: subscription.id
                    },
                });
                break;
            case "customer.subscription.deleted":
                console.log("deleted", event.type)

                await db.user.update({
                    // Find the customer in our database with the Stripe customer ID linked to this purchase
                    where: {
                        stripeCustomerId: subscription.customer as string,
                    },
                    // Update that customer so their status is now active
                    data: {
                        isActive: false,
                        subscriptionId: null
                    },
                });
                break;
            case 'customer.subscription.updated':
                console.log("update", event.type)

                if (event.data.object.status === 'active') {
                    await db.user.update({
                        // Find the customer in our database with the Stripe customer ID linked to this purchase
                        where: {
                            stripeCustomerId: subscription.customer as string,
                        },
                        // Update that customer so their status is now active
                        data: {
                            isActive: !event.data.object.cancel_at_period_end,
                        },
                    });
                }

                break;


            default:
                console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
                break;
        }

        // Return a response to acknowledge receipt of the event.
        return NextResponse.json({received: true});
    } catch {
        return NextResponse.json(
            {
                error: {
                    message: `Method Not Allowed`,
                },
            },
            {status: 405}
        ).headers.set("Allow", "POST");
    }
};

export {webhookHandler as POST};