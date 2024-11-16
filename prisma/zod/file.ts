import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompletePaper, relatedPaperSchema } from "./index"

export const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  fileUrl: z.string(),
  fileSize: z.number().int(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFile extends z.infer<typeof fileSchema> {
  uploadedBy: CompleteUser
  paper?: CompletePaper | null
}

/**
 * relatedFileSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFileSchema: z.ZodSchema<CompleteFile> = z.lazy(() => fileSchema.extend({
  uploadedBy: relatedUserSchema,
  paper: relatedPaperSchema.nullish(),
}))
