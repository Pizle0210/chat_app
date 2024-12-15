import * as z from "zod";

export const userValidation = z.object({
  fullName: z.string().min(4, { message: "Minimum of 4 characters" }).max(50),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 characters or above" }),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" })
});

export const signInValidation = z.object({
  password: z.string(),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" })
});
