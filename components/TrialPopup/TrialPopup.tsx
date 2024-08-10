'use client'
import {useState} from 'react'
import {Dialog, DialogFooter} from "@/components/ui/dialog";
import {
    DialogContent
} from "@/components/ui/dialog"

import {useSession} from "next-auth/react";
import {trialCheck} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import TrialPopupContent from "@/components/TrialPopup/TrialPopupContent";


export default function TrialPopup({setOpenPlan}: any) {

    const {data}: any = useSession();
    const [open, setOpen] = useState(true);


    // @ts-ignore
    return (
        trialCheck(new Date(data?.user.trial_end)) && !data?.user.isActive && !data?.user.subscriptionId ?
            <Dialog open={open} onOpenChange={setOpen}>
                <TrialPopupContent setOpen={setOpen} setOpenPlan={setOpenPlan}/>
            </Dialog> : <></>

    )
}