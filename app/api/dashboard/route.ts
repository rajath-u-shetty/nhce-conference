import { getUserAuth } from "@/lib/auth/utils";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getUserAuth();

  if (!session.session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.session.user.id;

  try {
    const papers = await db.paper.findMany({
      where: {
        userId: userId,
      },
      select: {
        status: true,
        title: true,
        url: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        authors: {
          select: {
            name: true,
            email: true,
            mobile: true,
            designation: true,
            institute: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(papers, { status: 200 });
  } catch (error) {
    console.error("Error fetching paper:", error);
    return NextResponse.json({ message: "Error fetching paper" }, { status: 500 });
  }
}
