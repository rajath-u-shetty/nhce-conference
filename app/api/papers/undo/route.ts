import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { PaperStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getUserAuth();

    if (!session.session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (session.session?.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { PaperId, statusFilter } = await req.json();

    if (!PaperId) {
      return new NextResponse("Paper ID is required", { status: 400 });
    }

    let statusToSet: PaperStatus = PaperStatus.PENDING;
    if (statusFilter === PaperStatus.APPROVED) {
      statusToSet = PaperStatus.APPROVED;
    } else if (statusFilter === PaperStatus.REJECTED) {
      statusToSet = PaperStatus.REJECTED;
    }

    const result = await db.paper.update({
      where: { id: PaperId },
      data: { status: statusToSet },
      select: {
        id: true,
        title: true,
        status: true
      }
    });

    return NextResponse.json(result, { status: 200 });

  } catch (e) {
    if (e instanceof Error) {
      console.log("GET request failed at /api/papers/undo", e.message);
    } else {
      console.log("GET request failed at /api/papers/undo", e);
    }
    return new Response(JSON.stringify({ message: "Error" }), { status: 500 });
  }
}

