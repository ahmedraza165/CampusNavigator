'use client'
import Link from "next/link";
import {redirect} from 'next/navigation'
import {useSession} from "next-auth/react";
const Result = ({params, searchParams}:any) => {

    const {data: session}:any = useSession();
    console.log(session)

    if(session?.user.isActive){
        redirect('/chat');
        return;
    }

    if(!session?.user.isActive && searchParams.success === 'true' ){
        redirect('/chat');
        return;
    }

    return (
        session?.user ?  <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 border-t">
                <div className=" h-[85vh] flex items-center justify-center">
                    <div className="bg-white p-6 border ">
                        {searchParams.success === 'true' && session?.user.isActive && <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                            <path fill="currentColor"
                                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                            </path>
                        </svg>}

                        {searchParams.success === 'false' &&  <div className={'flex justify-center'}>
                            <img className={'w-20 h-20 '} src={'/payment_fail.png'} alt={"exclamation"}/>
                        </div>}
                            <div className="text-center">
                            {searchParams.success === 'true' && session?.user.isActive &&   <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Subscription Done!</h3>}

                            {searchParams.success === 'false' &&   <h3 className="md:text-2xl text-base text-red-500 font-semibold text-center ">Sorry!! Subscription failed!</h3>}

                            <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                            <p> Have a great day!  </p>
                            <div className="py-10 text-center">
                                <Link href="/organizations" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                    GO BACK
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>  :<div></div>
    )
}

export default Result;
