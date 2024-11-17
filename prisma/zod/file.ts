import * as z from "zod"
import { CompletePaper, relatedPaperSchema, CompleteUser, relatedUserSchema } from "./index"

export const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  fileUrl: z.string(),
  fileSize: z.number().int(),
  userId: z.string(),
  uploadedAt: z.string(),
  uploadedBy: z.string(),
})

export interface CompleteFile extends z.infer<typeof fileSchema> {
  paper?: CompletePaper | null
  user: CompleteUser
}

/**
 * relatedFileSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFileSchema: z.ZodSchema<CompleteFile> = z.lazy(() => fileSchema.extend({
  paper: relatedPaperSchema.nullish(),
  user: relatedUserSchema,
}))
