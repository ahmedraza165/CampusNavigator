import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client"; // Import Prisma types

export async function POST(req: NextRequest) {
  try {
    const { token } = req.body as any; // Type assertion to any
    // Find user by verification token
    const user = await db.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpires: { gt: new Date() },
      } as Prisma.UserWhereInput, // Use Prisma types here
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 404 }
      );
    }

    // Update user's email verification status
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true, 
        emailVerificationToken: null,
        emailVerificationTokenExpires: null,
      } as any, 
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
