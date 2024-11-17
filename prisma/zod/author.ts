import * as z from "zod"
import { CompletePaper, relatedPaperSchema } from "./index"

export const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  mobile: z.string(),
  designation: z.string(),
  institute: z.string(),
  paperId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteAuthor extends z.infer<typeof authorSchema> {
  paper: CompletePaper
}

/**
 * relatedAuthorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAuthorSchema: z.ZodSchema<CompleteAuthor> = z.lazy(() => authorSchema.extend({
  paper: relatedPaperSchema,
}))
