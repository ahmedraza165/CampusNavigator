import React from 'react';
import {DialogContent} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

const TrialPopupContent = ({setOpen, setOpenPlan}:any) => {
    return (
        <>
            <DialogContent className="sm:max-w-2xl">
                <div className="bg-white">
                    <div className="py-10 lg:px-8">
                        <div className=" text-center">

                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                Your trial is expired!
                            </p>
                        </div>
                        <p className="mx-auto mt-3 max-w-2xl text-center text-lg leading-8 text-gray-600">
                        We regret to inform you that your trial period has expired.To continue, 
                        we encourage you to upgrade to a plan.
                        </p>

                    </div>
                    <div className={'flex items-center justify-center'}>
                        <Button onClick={() => {
                            setOpen(false)
                            setOpenPlan(true)
                        }}>
                            Buy Plan
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </>
    );
};

export default TrialPopupContent;
