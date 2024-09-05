import {z} from 'zod';

export const linkSchema = z.object({
  title: z.string(),
  url: z.string()
});
