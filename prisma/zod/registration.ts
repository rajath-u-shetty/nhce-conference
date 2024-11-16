import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const registrationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  conferenceId: z.string(),
  submittedAt: z.date(),
})

export interface CompleteRegistration extends z.infer<typeof registrationSchema> {
  user: CompleteUser
}

/**
 * relatedRegistrationSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedRegistrationSchema: z.ZodSchema<CompleteRegistration> = z.lazy(() => registrationSchema.extend({
  user: relatedUserSchema,
}))
