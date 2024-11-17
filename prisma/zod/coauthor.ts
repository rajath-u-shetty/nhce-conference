import * as z from "zod"
import { CompletePaper, relatedPaperSchema } from "./index"

export const coAuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  designation: z.string(),
  institute: z.string(),
  paperId: z.string(),
})

export interface CompleteCoAuthor extends z.infer<typeof coAuthorSchema> {
  paper: CompletePaper
}

/**
 * relatedCoAuthorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCoAuthorSchema: z.ZodSchema<CompleteCoAuthor> = z.lazy(() => coAuthorSchema.extend({
  paper: relatedPaperSchema,
}))
