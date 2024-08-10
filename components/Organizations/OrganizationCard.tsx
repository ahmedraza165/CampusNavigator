import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PenSquare} from "lucide-react";
import React, {useState} from "react";
import {Dialog} from "@/components/ui/dialog";
import {EditOrganization} from "@/components/Organizations/EditOrganization";

const OrganizationCard = ({organization,getOrganizations}: any) => {
    const [open, setOpen] = useState(false)

    return ( 
        <div key={organization.id}
             className={'bg-gray-50 py-2  cursor-pointer rounded-md px-5 flex justify-between'}>
            <div className={'max-w-md'}>
                <Link href={`/organization/${organization.id}`}
                      className={'text-lg font-medium capitalize hover:underline'}>
                     {organization.name}
                </Link>
                <p className={'text-sm text-gray-500'}>{organization.description}</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>


                <Button onClick={() => setOpen(true)} variant={'ghost'}>
                    <PenSquare className={'w-5 h-5'}/>
                </Button>
                <EditOrganization setOpen={setOpen} getOrganizations={getOrganizations} organization={organization}/>
            </Dialog>

        </div>
    )
}

export default OrganizationCard;