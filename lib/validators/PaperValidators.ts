import { z } from "zod";

export const PaperIdValidator = z.object({
  PaperId: z.string(),
});

export type PaperIdRequest = z.infer<typeof PaperIdValidator>;
