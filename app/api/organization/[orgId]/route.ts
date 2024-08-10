import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import {db} from "@/lib/db";

export async function GET(req: any, {params}:{params: {orgId: string}}) {
    try {
        const orgId = params.orgId;
        const token:any = await getToken({req});

        if (!token) {
            return NextResponse.json(
                {
                    organization: null,
                    message: "Unauthenticated!",
                },
                {status: 401}
            );
        }

        // @ts-ignore
        const org = await db.organization.findUnique({
            where: {
                id: orgId,
                owner_id: token.id
            }
        });

        if(!org){
            return NextResponse.json(
                {
                    organization: null,
                    message: "Organization not found",
                },
                {status: 409}
            );
        }
        return NextResponse.json(
            {
                organization: org,
                message: "Organization fetched successfully",
            },
            {status: 409}
        );

    } catch (error: any) {
        return NextResponse.json({
                organization: null,
                message: "Something went wrong!",
                error: error.message},
            {status: 500});
    }
}


export async function PUT(req: NextRequest, {params}:{params: {orgId: string}}) {
    try {
        const orgId = params.orgId;

        const token = await getToken({req})
        if (!token) {
            return NextResponse.json(
                {
                    message: "Unauthenticated!",
                },
                {status: 401}
            );
        }

        const body = await req.json();

        if (!body.name) {
            return NextResponse.json(
                {
                    organization: null,
                    message: "Organization name required",
                },
                {status: 403}
            );
        }

        // @ts-ignore
        const available = await db.organization.findUnique({where: {id: orgId}});
            if(!available){
                return NextResponse.json(
                    {
                        organization: null,
                        message: "Organization not found",
                    },
                    {status: 409}
                );
            }

        const existingOrganization = await db.organization.findFirst(
            {
                where: {owner_id: body.owner_id, name: body.name},
            }
        );
        if (available.name !== body.name && existingOrganization ) {
            return NextResponse.json(
                {
                    organization: null,
                    message: "Organization with this name already exists.",
                },
                {status: 409}
            );
        }

        //update organization
        const updateOrganization = await db.organization.update(
            {where: {id: orgId},
                data: {
                name: body.name,
                description: body.description
            }
            });

        return NextResponse.json({
            organization: updateOrganization,
            message: "Organization updated successfully"
        }, {status: 201});

    } catch (error: any) {
        return NextResponse.json({organization: null,
                message: "Something went wrong!",
                error: error.message},
            {status: 500});
    }
}