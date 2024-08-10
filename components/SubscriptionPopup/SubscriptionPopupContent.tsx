import React from 'react';
import {DialogContent} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

const SubscriptionPopupContent = ({setOpen, setOpenPlan}:any) => {
    return (
        <>
            <DialogContent className="sm:max-w-2xl">
                <div className="bg-white">
                    <div className="py-10 lg:px-8">
                        <div className=" text-center">

                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                Your subscription plan expired or canceled!!
                            </p>
                        </div>
                        <p className="mx-auto mt-3 max-w-2xl text-center text-lg leading-8 text-gray-600">
                            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut
                            non voluptas in. Explicabo id ut laborum.
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

export default SubscriptionPopupContent;
