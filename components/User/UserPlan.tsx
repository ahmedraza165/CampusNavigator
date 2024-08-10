'use client'
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {StoreContext} from "@/context";
import {PropagateLoader} from "react-spinners";
import dayjs from "dayjs";
import { getRemainingTrialDays } from '@/lib/helpers';
import PricingPopup from "@/components/pricing/PricingPopup";


const UserPlan = ({user}: any) => {
    const [subDetail, setSubDetail] = useState<any>({});
    const [loading, setLoading] = useState(true)
    const {setPopupOpen} = useContext(StoreContext);
    const [open, setOpen] = useState(false);

    const getSubscription = async () => {
        try {

            if(!user.subscriptionId){
                setLoading(false)
                return;
            }
            setLoading(true)
            const res = await axios.get(`/api/stripe/subscription_items/${user?.subscriptionId}`)
            if(res.data){
                setSubDetail(res?.data?.data)
            }
            setLoading(false)
        }catch(e:any){
            setLoading(false)
            console.log(e.message)
        }
    }
    useEffect(() => {

        if (user) {
            getSubscription().then(r => console.log(r))

        }

    }, [user?.subscriptionId])



    return (

      <div>
          <PricingPopup setOpenPlan={setOpen} openPlan={open} />
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
              {!loading ?
                  <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Your Plan</h2>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                          {user?.isActive ? 'Your are now subscribed user' : 'Your are trial user'}
                      </p>
                      <div className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                          <div className="pt-6 sm:flex w-full">
                              {user.isActive && <div className="font-medium text-gray-900 sm:w-64 sm:flex sm:pr-6 flex items-center grow">
                                  <span>Your are using this </span>
                                  <span className={'cursor-pointer text-indigo-700 p-2 rounded'}>
                            {subDetail?.product?.name} </span> <span>plan {subDetail?.plan?.interval}ly</span>
                              </div>}

                              {!user.isActive && <div className="font-medium text-gray-900 sm:w-64 sm:flex sm:pr-6 flex items-center grow">
                                  Your trial period is {getRemainingTrialDays(user?.trial_end)} days
                              </div>}

                              <div className="mt-1 gap-x-6 sm:mt-0 grow-0">
                                  <div>
                                      <button onClick={() => setOpen(true)} type="button"
                                              className="px-4 py-2 rounded font-semibold text-indigo-600 hover:text-indigo-500 bg-indigo-200">
                                          {user.isActive ? 'Update' : 'Subscribe now'}
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  : <div className={'flex items-center justify-center'}>
                      <PropagateLoader/>
                  </div>
              }
          </div>
      </div>
    );
};

export default UserPlan;
