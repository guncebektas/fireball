import {z} from "zod";

export const fileUploadSchema = z.object({
  fileData: z.instanceof(Uint8Array),
  name: z.string(),
  type: z.string(),
});
