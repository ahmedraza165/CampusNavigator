'use client'
import React, {useEffect, useState} from "react";
import OrganizationHeader from "@/components/Organizations/OrganizationHeader";
import axios from "axios";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {PenSquare} from "lucide-react";
import OrganizationCard from "@/components/Organizations/OrganizationCard";
import SkeletonLoading from "@/components/Organizations/SkeletonLoading";


export default function Organization() {
    const [organizations, setOrganizations] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getOrganizations();
    }, []);

    const getOrganizations = async () => {
        setIsLoading(true);

        const res = await axios.get('/api/organization');
        if (res.data) {
            setOrganizations(res.data.organizations)
        }
        setIsLoading(false)
    }

    return (

        <>
            <OrganizationHeader getOrganizations={getOrganizations} title={'Organizations'}/>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 border-t">
                    <div className={'space-y-2'}>
                        {!isLoading && organizations.map((organization: any) => (
                            <OrganizationCard
                                key={organization.id}
                                organization={organization}
                                getOrganizations={getOrganizations}/>
                        ))}

                        {isLoading && <>
                            <SkeletonLoading/>
                            <SkeletonLoading/>
                            <SkeletonLoading/>
                            <SkeletonLoading/>
                        </>}
                        {!isLoading && organizations.length === 0 && <div>
                            Your dont have any organizations
                        </div>}
                    </div>
                </div>
            </main>
        </>
    )
}