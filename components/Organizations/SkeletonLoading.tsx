import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

const SkeletonLoading = () => {
    return (
        <div className={'flex justify-between gap-5'}>
            <div className={'grow mb-5'}>
                <Skeleton className="py-2 h-10 rounded-md px-5 w-full"/>
                <Skeleton className="py-2 h-5 mt-3 rounded-md px-5 w-full"/>
                <Skeleton className="py-2 h-5 mt-1 rounded-md px-5 w-full"/>
                <Skeleton className="py-2 h-5 mt-1 rounded-md px-5 w-full"/>
            </div>
            <div>
                <Skeleton className="py-2 h-8 rounded-md px-5 w-full"/>
            </div>
        </div>
    )
}

export default SkeletonLoading;