import * as z from "zod"
import { Decimal } from "decimal.js"
import { PaymentStatus } from "@prisma/client"
import { CompletePaper, relatedPaperSchema } from "./index"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const paymentSchema = z.object({
  id: z.number().int(),
  paperId: z.string(),
  amount: z.number(),
  status: z.nativeEnum(PaymentStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePayment extends z.infer<typeof paymentSchema> {
  paper: CompletePaper
}

/**
 * relatedPaymentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPaymentSchema: z.ZodSchema<CompletePayment> = z.lazy(() => paymentSchema.extend({
  paper: relatedPaperSchema,
}))
