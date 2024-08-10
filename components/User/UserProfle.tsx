'use client'
import React from 'react';
import UserInfo from "@/components/User/UserInfo";


const UserProfile = ({user}: any) => {

    return (
        <>
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <UserInfo title={"Full Name"} value={user?.firstName + " " + user?.lastName}/>
                        <UserInfo title={"Email"} value={user?.email}/>
                        <UserInfo title={"Password"} value={'••••••••'}/>
                    </dl>
                </div>


            </div>
        </>
    );
};

export default UserProfile;
