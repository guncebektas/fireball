import {z} from "zod";

export const userSetPasswordSchema = z.object({
  userId: z.string(),
  password: z.string()
});
