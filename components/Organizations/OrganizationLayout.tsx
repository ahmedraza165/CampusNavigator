'use client'
import {Disclosure} from "@headlessui/react";
import React from "react";
import {cn} from "@/lib/utils";
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Profile from "./Profile";
import {LogOut, Settings, User} from "lucide-react";
import {signOut} from "next-auth/react";
import Mobile from "@/components/Organizations/Mobile";
import {usePathname} from "next/navigation";
import { useSession } from "next-auth/react";


const navigation = [
    {name: 'CampusNavigator', href: '/chat', current: true},
]
const userNavigation = [
    {name: 'Your profile', href: '/settings', icon: <User className="mr-2 h-4 w-4"/>},
    {name: 'Settings', href: '/settings', icon: <Settings className="mr-2 h-4 w-4"/>},
]
const OrganizationLayout = () => {
    const { data }: any = useSession();
    const userdata = data?.user;
    
    const user = {
        name: userdata?.firstName + " " + userdata?.lastName,
        email: userdata?.email,
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
    const pathName= usePathname();

    const activePath = ['/result', '/settings']

    return (
        activePath.includes(pathName) ?   <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">

                                    {/* Profile dropdown */}
                                    <Profile userNavigation={userNavigation} user={user}/>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                <Mobile userNavigation={userNavigation} navigation={navigation} user={user}/>
                </>
            )}
        </Disclosure> : <></>
    )
}


export default OrganizationLayout;