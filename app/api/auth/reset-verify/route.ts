// Server-side code
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const { token } = req.body as any;

        const user = await db.user.findFirst({
            where: {
                emailVerificationToken: token,
            } as Prisma.UserWhereInput,
        });

        if (!user) {
            return NextResponse.json(
                { message: "Email verification token expired or invalid" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Email verified successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error verifying email:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
