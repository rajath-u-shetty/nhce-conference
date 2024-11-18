// app/api/admin/route.ts
import { NextResponse } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { session } = await getUserAuth();
    
    // Check if session exists and has user data
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized - No valid session" },
        { status: 401 }
      );
    }

    const { secretKey } = await req.json();

    // Validate secret key exists
    if (!process.env.ADMIN_SECRET_KEY) {
      console.error("ADMIN_SECRET_KEY not configured");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Check if secret key matches
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { message: "Invalid secret key" },
        { status: 400 }
      );
    }

    // Update user role to ADMIN
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        role: "ADMIN",
      },
      select: {
        id: true,
        role: true,
        email: true,
      },
    });

    console.log("User updated successfully:", updatedUser);

    return NextResponse.json(
      { 
        message: "Admin access granted successfully",
        user: updatedUser
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in admin API:", error);
    return NextResponse.json(
      { message: "Failed to update user role" },
      { status: 500 }
    );
  }
}
