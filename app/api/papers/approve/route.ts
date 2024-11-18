import { getUserAuth } from "@/lib/auth/utils";
import { PaperIdValidator } from "@/lib/validators/PaperValidators";
import { db } from "@/lib/db";

export async function POST({ request }: { request: Request }) {
  const session = await getUserAuth();

  if(!session.session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  if(session.session?.user.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { PaperId } = PaperIdValidator.parse(body);
  
  try {
    await db.paper.update({
      where: {
        id: PaperId,
      },
      data: {
        status: "APPROVED",
      },
    });

    return new Response(JSON.stringify({ message: "Paper Approved" }), {
      status: 200,
    });
  }catch(e: any) {
    console.log("POST request failed at /api/papers/approve", e);
    return new Response(JSON.stringify({ message: "Error" }), { status: 500 })
  }
}
