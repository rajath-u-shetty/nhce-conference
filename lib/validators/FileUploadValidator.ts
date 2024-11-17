import { z } from "zod";

export const FileUploadValidator = z.object({
  fileUrl: z.string(),
  fileSize: z.number(),
  userId: z.string(),
  uploadedBy: z.string(),
  updatedAt : z.string(),
  name : z.string(),
  id : z.string().optional()
})

export type FileUploadRequest = z.infer<typeof FileUploadValidator>;

