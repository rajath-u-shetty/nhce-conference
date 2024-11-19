import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { PaperStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getUserAuth();

  if (!session.session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (session.session?.user.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status") as PaperStatus | 'ALL';

  if (status && status !== 'ALL') {
    try {
      const papers = await db.paper.findMany({
        where: {
          status: status,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          title: true,
          url: true,
          id: true,
          status: true,
          updatedAt: true,
          authors: {
            select: {
              name: true,
            }
          }
        }
      })

      return new Response(JSON.stringify(papers), {
        status: 200,
      });

    } catch (e: any) {
      console.log("GET request failed at /api/papers", e);
      return new Response(JSON.stringify({ message: "Error" }), { status: 500 })
    }
  }

  if (status && status === "ALL") {
    try {
      const papers = await db.paper.findMany({
        orderBy: {
          createdAt: "asc",
        },
        select: {
          title: true,
          url: true,
          id: true,
          status: true,
          updatedAt: true,
          authors: {
            select: {
              name: true,
            }
          }
        }
      })

      return new Response(JSON.stringify(papers), {
        status: 200,
      });

    } catch (e: any) {
      console.log("GET request failed at /api/papers", e);
      return new Response(JSON.stringify({ message: "Error" }), { status: 500 })
    }
  }



}
