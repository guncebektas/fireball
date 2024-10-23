import {z} from 'zod';

export const docSchema = z.object({
  title: z.string(),
  url: z.string()
});
