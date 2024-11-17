import * as z from "zod"
import { PaperStatus } from "@prisma/client"
import { CompletePayment, relatedPaymentSchema, CompleteFile, relatedFileSchema, CompleteUser, relatedUserSchema, CompleteAuthor, relatedAuthorSchema, CompleteCoAuthor, relatedCoAuthorSchema } from "./index"

export const paperSchema = z.object({
  id: z.string(),
  title: z.string(),
  abstract: z.string(),
  status: z.nativeEnum(PaperStatus),
  url: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePaper extends z.infer<typeof paperSchema> {
  payment?: CompletePayment | null
  file?: CompleteFile | null
  user: CompleteUser
  authors: CompleteAuthor[]
  coAuthors: CompleteCoAuthor[]
}

/**
 * relatedPaperSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPaperSchema: z.ZodSchema<CompletePaper> = z.lazy(() => paperSchema.extend({
  payment: relatedPaymentSchema.nullish(),
  file: relatedFileSchema.nullish(),
  user: relatedUserSchema,
  authors: relatedAuthorSchema.array(),
  coAuthors: relatedCoAuthorSchema.array(),
}))
