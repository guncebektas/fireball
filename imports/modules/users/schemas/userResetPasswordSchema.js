import {z} from "zod";

export const userResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string()
})
