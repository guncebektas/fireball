import {z} from 'zod';

export const faqsListSchema = z.object({
  organizationId: z.string()
});
