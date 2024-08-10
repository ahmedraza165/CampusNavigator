'use client'
import React, {useContext, useState} from "react";
import {Button} from "@/components/ui/button";

import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {AddOrganization} from "@/components/Organizations/AddOrganization";
import TrialPopup from "@/components/TrialPopup/TrialPopup";
import PricingPopup from "@/components/pricing/PricingPopup";
import {useSession} from "next-auth/react";
import {trialCheck} from "@/lib/utils";
import TrialPopupContent from "@/components/TrialPopup/TrialPopupContent";
import SubscriptionCheckup from "@/components/SubscriptionCheckup/SubscriptionCheckup";
import {StoreContext} from "@/context";

const OrganizationHeader = ({title, getOrganizations}: { title: string, getOrganizations: () => void }) => {
    const [open, setOpen] = useState(false)
    const [openPlan, setOpenPlan] = useState(false);
    const {data}: any = useSession();
    const {setPopupOpen} = useContext(StoreContext);

    return (

        <>
            <header className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className={'flex items-center justify-between'}>

                        <h1 className="text-lg md:text-3xl font-bold tracking-tight text-gray-900">{title}</h1>

                        {data?.user.isActive || !trialCheck(new Date(data?.user.trial_end))  ? <Dialog open={open} onOpenChange={setOpen}>

                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => setOpen(true)}
                                >

                                    Add Organization

                                </Button>
                            </DialogTrigger>
                            <AddOrganization setOpen={setOpen} getOrganizations={getOrganizations}/>

                        </Dialog> : (
                            <Button
                                onClick={() => setPopupOpen(true)}>
                                Add Organization

                            </Button>

                    )
                        }

                    </div>
                </div>
            </header>
        </>
    )
}
export default OrganizationHeader;