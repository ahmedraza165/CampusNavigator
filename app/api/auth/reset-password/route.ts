// Server-side code
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { token, password } = body;

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
        
        body.password = await hash(password, 10); 
        delete body.token;
        delete body.confirmPassword;
        await db.user.update({
            where: { id: user.id },
            data: {
                ...body,
                emailVerificationToken: null,
                emailVerificationTokenExpires: null,
            },
        });

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
