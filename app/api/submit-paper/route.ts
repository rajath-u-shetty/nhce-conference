import { getUserAuth } from "@/lib/auth/utils";
import { FileUploadValidator } from "@/lib/validators/FileUploadValidator";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getUserAuth();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await request.json();

  const { fileUrl, fileSize, userId, updatedAt, name } = FileUploadValidator.parse(body);

  try {
    const user = db.user.findUnique({
      where: {
        id: userId
      },
      include: { uploadedFiles: true }, // Include the user's files

    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const file = await db.file.create({
      data: {
        name,
        fileUrl,
        fileSize,
        uploadedBy: {
          connect: { id: userId },
        },
        updatedAt,
      }
    })

    return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "error" }), { status: 500 });
  }
}
