import {z} from 'zod';

export const simpleEmailSchema = z.object({
  to: z.string(),
  subject: z.string(),
  message: z.string(),
});
