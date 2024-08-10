'use client'

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useSession} from "next-auth/react";


export default function Home() {
    const {data:session} = useSession();

    return (

        <main className="">
            <nav className={'bg-gray-200 shadow-sm py-1'}>

            </nav>
            <div className={'text-center mt-5'}>
                <h2 className={'text-center text-5xl'}>Welcome to our CRM!!</h2>
                <Button asChild className={'mt-2'}>
                    <Link href={'/dashboard'}>Got to admin</Link>
                </Button>
            </div>


        </main>
    )
}
