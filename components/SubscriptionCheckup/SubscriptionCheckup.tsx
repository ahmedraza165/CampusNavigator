'use client'

import React, {useContext, useState} from 'react';
import PricingPopup from "@/components/pricing/PricingPopup";
import TrialPopup from "@/components/TrialPopup/TrialPopup";
import {StoreContext} from "@/context";
import TrialPopupContent from "@/components/TrialPopup/TrialPopupContent";
import {Dialog} from "@/components/ui/dialog";
import {trialCheck} from "@/lib/utils";
import {useSession} from "next-auth/react";
import SubscriptionPopupContent from "@/components/SubscriptionPopup/SubscriptionPopupContent";
import SubscriptionPopup from "@/components/SubscriptionPopup/SubscriptionPopup";




const SubscriptionCheckup = () => {

    const [openPlan, setOpenPlan] = useState(false);
    const {popupOpen, setPopupOpen} = useContext(StoreContext);
    const {data}: any = useSession();


    return (
        <>
            <TrialPopup setOpenPlan={setOpenPlan}/>
            <SubscriptionPopup setOpenPlan={setOpenPlan} />
            <PricingPopup setOpenPlan={setOpenPlan} openPlan={openPlan}/>

            {trialCheck(new Date(data?.user.trial_end)) && !data?.user.isActive && !data?.user.subscriptionId && (
                <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
                    <TrialPopupContent setOpen={setPopupOpen} setOpenPlan={setOpenPlan}/>
                </Dialog>
            )
            }

            {trialCheck(new Date(data?.user.trial_end)) && !data?.user.isActive && data?.user.subscriptionId && (
                <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
                    <SubscriptionPopupContent setOpen={setPopupOpen} setOpenPlan={setOpenPlan}/>
                </Dialog>
            )
            }

        </>
    )
        ;
};

export default SubscriptionCheckup;
