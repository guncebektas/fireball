import {z} from "zod";

export const profileDetails = z.object({
  firstname: z.string(),
  lastname: z.string()
})
