'use client'
import {useState} from 'react'
import {Dialog, DialogFooter} from "@/components/ui/dialog";
import {
    DialogContent
} from "@/components/ui/dialog"

import {useSession} from "next-auth/react";
import {trialCheck} from "@/lib/utils";
import SubscriptionPopupContent from "@/components/SubscriptionPopup/SubscriptionPopupContent";


export default function SubscriptionPopup({setOpenPlan}: any) {

    const {data}: any = useSession();
    const [open, setOpen] = useState(true);


    // @ts-ignore
    return (
        trialCheck(new Date(data?.user.trial_end)) && !data?.user.isActive  && data?.user.subscriptionId ?
            <Dialog open={open} onOpenChange={setOpen}>
                <SubscriptionPopupContent setOpen={setOpen} setOpenPlan={setOpenPlan} />
            </Dialog> : <></>

    )
}