import { z } from "zod";

export const FileUploadValidator = z.object({
  fileUrl: z.string(),
  fileSize: z.number(),
  userId: z.string(),
  uploadedBy: z.string(),
  uploadedAt : z.string(),
  name : z.string(),
  id : z.string().optional()
})

export type FileUploadRequest = z.infer<typeof FileUploadValidator>;

export const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).optional(),
  email: z.string().email({ message: "Invalid email address." }).optional(),
  designation: z.string().min(2, { message: "Designation must be at least 2 characters." }).optional(),
  institute: z.string().min(2, { message: "Institute must be at least 2 characters." }).optional(),
})

export type CoAuthorDetails = z.infer<typeof formSchema>

export const authorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobileNumber: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  designation: z.string().min(2, { message: "Designation must be at least 2 characters." }),
  institute: z.string().min(2, { message: "Institute must be at least 2 characters." }),
})

export type AuthorDetails = z.infer<typeof authorSchema>

export const paperDetailsValidator = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  abstract: z.string().min(2, { message: "Abstract must be at least 2 characters." }),
});

export type PaperDetailsRequest = z.infer<typeof paperDetailsValidator>;

export const multiFormValidator = z.object({
  author: authorSchema,
  coAuthors: z.array(formSchema), // Change to array
  file: FileUploadValidator,
  userId: z.string(),
  paperDetails: paperDetailsValidator,
});

export type MultiFormRequest = z.infer<typeof multiFormValidator>;

