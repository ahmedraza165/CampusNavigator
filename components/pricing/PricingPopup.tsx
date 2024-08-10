'use client'
import {Dialog} from "@/components/ui/dialog";
import {useSession} from "next-auth/react";
import PriceDialogContent from "@/components/pricing/PriceDialogContent";


export default function PricingPopup({setOpenPlan, openPlan}: any) {

    const {data}: any = useSession();
    // const [open, setOpen] = useState(true)

    if (!data) {
        return null; // Return null if session data is not available
    }
    // @ts-ignore
    return (
        <Dialog open={openPlan} onOpenChange={setOpenPlan}>
            <PriceDialogContent/>
        </Dialog>

    )
}