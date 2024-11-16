import { z } from "zod";

export const SignUpValidator = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  secretkey: z.string().min(2, {
    message: "Enter secret key to login as Admin",
  }),
});

export type SignUpRequest = z.infer<typeof SignUpValidator>;

