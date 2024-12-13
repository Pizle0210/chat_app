import * as z from "zod";

export const messageValidation = z.object({
  text: z.string(),
  image: z.string()
});
