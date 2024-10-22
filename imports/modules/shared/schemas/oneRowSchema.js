import {z} from "zod";

export const oneRowSchema = z.object({
  _id: z.string()
});
