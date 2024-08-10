import {NextRequest, NextResponse} from 'next/server';
import {db} from "@/lib/db";

import {getToken} from "next-auth/jwt";


// Handles GET requests to /api
export async function GET(req: NextRequest) {

    try {
        const token:any = await getToken({req})
        if (!token) {
            return NextResponse.json(
                {
                    organization: null,
                    message: "Unauthorized!",
                },
                {status: 401}
            );
        }

        const organizations = await db.organization.findMany({
            where: {owner_id: token.id},
            orderBy: {id: 'asc'}
        });

        return NextResponse.json({organizations: organizations, message: "Success"}, {status: 200});
    } catch (err: any) {
        return NextResponse.json({organization: null, message: "Something went wrong!", error: err.message},
            {status: 500});
    }
    // ...
}

export async function POST(req: NextRequest) {

    try {
        const token = await getToken({req});
        console.log(token)
        if (!token) {
            return NextResponse.json(
                {
                    message: "Unauthorized!",
                },
                {status: 401}
            );
        }
        const body = await req.json();
        body.owner_id = token.id

        if (!body.name) {
            return NextResponse.json(
                {
                    organizations: null,
                    message: "Organization name required",
                },
                {status: 403}
            );
        }

        const available = await db.organization.findMany();

        if (available.length > 0) {
            // check if organization already exists
            // @ts-ignore
            const existingOrganization = await db.organization.findFirst(
                {
                    where: {owner_id: body.owner_id, name: body.name},
                }
            );
            if (existingOrganization) {
                return NextResponse.json(
                    {
                        organizations: null,
                        message: "Organization with this name already exists.",
                    },
                    {status: 409}
                );
            }
        }
        console.log({body})

        //insert new organization
        const newOrganization = await db.organization.create({
            data: body,
        });
        return NextResponse.json({
            organization: newOrganization,
            message: "Organization created successfully"
        }, {status: 201});
    } catch (error: any) {
        return NextResponse.json({organization: null, message: "Something went wrong!", error: error.message},
            {status: 500});
    }
}


