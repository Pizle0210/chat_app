import * as z from "zod";

export const userValidation = z.object({
  fullName: z.string().min(4, { message: "Minimum of 4 characters" }).max(50),
  password: z
    .string()
    .min(7, { message: "Password cannot be less than 7 characters" }),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" })
});
