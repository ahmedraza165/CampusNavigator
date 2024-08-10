import React from 'react';
import {cn} from "@/lib/utils";
import {BellIcon, CreditCardIcon, CubeIcon, FingerPrintIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const secondaryNavigation = [
    { name: 'General', href: 'profile', icon: UserCircleIcon, current: false
    },
    // { name: 'Security', href: '#security', icon: FingerPrintIcon, current: false },
    // { name: 'Notifications', href: '#notification', icon: BellIcon, current: false },
    //{ name: 'Plan', href: 'plan', icon: CubeIcon, current: false },
    // { name: 'Billing', href: '#billing', icon: CreditCardIcon, current: false },
]


const UserSidebar = () => {

        const pathname = usePathname();
        const router = useRouter();
        const tabs = useSearchParams();
        const tab = tabs.get('tab');


    return (
        <>
            <aside className=" flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-12">
                <nav className="flex-none px-4 sm:px-6 lg:px-0">
                    <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                        {secondaryNavigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={`${pathname}?tab=${item.href}`}
                                    className={cn(
                                        tab === item.href || (!tab && item.name === 'General')
                                            ? 'bg-gray-50 text-indigo-600'
                                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                        'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            tab === item.href  || (!tab && item.name === 'General')? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                            'h-6 w-6 shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default UserSidebar;
