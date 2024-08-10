'use client'
import UserProfile from "@/components/User/UserProfle";
import UserSidebar from "@/components/User/UserSidebar";
import { usePathname, useSearchParams} from 'next/navigation';
import {useSession} from "next-auth/react";
import UserPlan from "@/components/User/UserPlan";

export default function Settings() {
    const router = usePathname();
    const {data}:any = useSession();
    const user = data?.user;

    const tabs = useSearchParams();
    const component = tabs.get('tab');

    const renderSection = (params:any) => {
        switch (params) {
            case 'profile':
                return <UserProfile user={user} />
            case 'plan':
                return <UserPlan user={user} />
            default:
                return <UserProfile user={user}  />
        }
    };

    return (
        <>

            <div className="mx-auto max-w-7xl pt-5 lg:flex lg:gap-x-16 lg:px-8">
                <UserSidebar/>
                <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-12">
                    {renderSection(component)}
                </main>
            </div>
        </>
    )
}