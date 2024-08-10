import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";


export async function GET(req:NextRequest,{params}:{params: {subscribeId: string}}) {

    const subId = params.subscribeId;


    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16",});
    const authSession = await getServerSession(authOptions);

    if (!authSession?.user) {
        return NextResponse.json({
            error: {
                code: 'no-success',
                message: 'Your are not signed in'
            }

        },{status: 401})
    }
    if (!subId) {
        return NextResponse.json({
            error: {
                code: 'no-success',
                message: 'Subscription id not found'
            }

        },{status: 404})
    }


try {
    const subscriptions:any = await stripe.subscriptions.retrieve(
        subId
    );
    if(subscriptions){

        const product = await stripe.products.retrieve(subscriptions?.plan.product);
        return NextResponse.json({data: {product: product, plan: subscriptions.plan} }, {status: 200})

    }

} catch (e:any) {
    console.log(e.message);
    return NextResponse.json({
        error: {
            code: 'no-success',
            message: e.message
        }

    }, {status: 401})
}
}

