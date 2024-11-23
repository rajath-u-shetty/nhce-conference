import { NextRequest, NextResponse } from 'next/server';
import { getUserAuth } from "@/lib/auth/utils";
import { PaperIdValidator } from "@/lib/validators/PaperValidators";
import { db } from "@/lib/db";
import { PaperStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const session = await getUserAuth();

    if (!session.session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { PaperId } = PaperIdValidator.parse(body);

    await db.paper.update({
      where: {
        id: PaperId,
      },
      data: {
        status: PaperStatus.REJECTED,
      },
    });

    return NextResponse.json({ message: "Paper Approved" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      console.log("GET request failed at /api/papers/reject", e.message);
    } else {
      console.log("GET request failed at /api/papers/reject", e);
    }
    return new Response(JSON.stringify({ message: "Error" }), { status: 500 });
  }
}

