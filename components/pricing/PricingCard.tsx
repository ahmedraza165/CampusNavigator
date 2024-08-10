import {cn} from "@/lib/utils";
import {CheckIcon} from "@heroicons/react/20/solid";
import axios from "axios";
import {useSession} from "next-auth/react";
import getStripe from "@/utils/get-stripejs";


const PricingCard = ({product, selectedType}: any) => {

    const session = useSession();

    const handleCheckout = async (priceId: string) => {
        try {

            const {data}: any = await axios.post(
                `api/stripe/checkout-session`,
                {productId: priceId},
                {headers: {'Content-Type': 'application/json'}}
            );
            const stripe = await getStripe();
            console.log({data})
           const {error} =  await stripe!.redirectToCheckout({sessionId: data.session.id});
           console.log(error);
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div
            key={product.id}
            className={cn(
                product.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200',
                'rounded-3xl p-8 ring-1 xl:p-10'
            )}
        >
            <h3
                id={product.id}
                className={cn(
                    product.featured ? 'text-white' : 'text-gray-900',
                    'text-lg font-semibold leading-8'
                )}
            >
                {product.name}
            </h3>
            <p className={cn(product.featured ? 'text-gray-300' : 'text-gray-600', 'mt-4 text-sm leading-6')}>
                {product.description}
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
                <span
                    className={cn(
                        product.featured ? 'text-white' : 'text-gray-900',
                        'text-4xl font-bold tracking-tight')}
                >
                    ${typeof product.price === 'string' ? product.price : product.price[selectedType.value]}
                </span>

                <span
                    className={cn(
                        product.featured ? 'text-gray-300' : 'text-gray-600',
                        'text-sm font-semibold leading-6'
                    )}
                >{selectedType.priceSuffix}
                    </span>

            </p>
            <button
                onClick={() => handleCheckout(product.productId)}
                className={cn(
                    product.featured
                        ? 'bg-white text-black hover:bg-gray-200 focus-visible:outline-white '
                        : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
                    'mt-6 w-full block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
            >
                {product.cta}
            </button>
            <ul
                role="list"
                className={cn(
                    product.featured ? 'text-gray-300' : 'text-gray-600',
                    'mt-8 space-y-3 text-sm leading-6 xl:mt-10'
                )}
            >
                {product.features.map((feature: any) => (
                    <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                            className={cn(product.featured ? 'text-white' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                            aria-hidden="true"
                        />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PricingCard;