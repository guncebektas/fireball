import {z} from "zod";

export const fileIdSchema = z.object({
  fileId: z.string()
});
