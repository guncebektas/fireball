import { z } from 'zod';

export const AxiosExampleContract = z.object({
  status: z.string(),
  data: z.any(),
});
