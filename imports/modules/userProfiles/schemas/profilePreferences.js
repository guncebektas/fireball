import {z} from "zod";

export const profilePreferences = z.object({
  theme: z.string()
})
