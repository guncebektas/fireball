import {z} from 'zod';

export const notificationSchema = z.object({
  title: z.string(),
  text: z.string(),
  url: z.string()
});
