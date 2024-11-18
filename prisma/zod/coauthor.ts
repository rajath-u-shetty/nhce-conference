import * as z from "zod"
import { CompletePaper, relatedPaperSchema } from "./index"

export const coAuthorSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  designation: z.string().nullish(),
  institute: z.string().nullish(),
  paperId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
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
