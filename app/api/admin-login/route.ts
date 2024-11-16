import { db } from "@/lib/db/index";
import { SignUpValidator } from "@/lib/validators/sign-up-validator";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, secretkey } = SignUpValidator.parse(body);

    if (secretkey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: "Invalid secret key" },
        { status: 401 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Admin already exists",
          existingUser
        },
        { status: 201 }
      );
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultName = email.split('@')[0];

    const newAdmin = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: defaultName,
        role: "ADMIN",
      },
    });

    return NextResponse.json(
      {
        message: "Admin created successfully",
        user: {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.name,
          role: newAdmin.role
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Admin creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
