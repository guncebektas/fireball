import {z} from "zod";

export const userResetPasswordSchema = z.object({
  userId: z.string(),
  password: z.string()
})
