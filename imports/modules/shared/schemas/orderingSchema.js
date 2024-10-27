import {z} from "zod";

export const orderingSchema = z.object({
  _id: z.string()
});
