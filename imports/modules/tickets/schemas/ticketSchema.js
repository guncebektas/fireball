import {z} from 'zod';
import {ZodBridge} from 'uniforms-bridge-zod';

export const ticketFormSchema = {
  message: z.string(),
  question: z.string(),
  answer: z.string(),
  answer2: z.string(),
};

export const ticketSchema = z.object(ticketFormSchema);

export const ticketBridge = new ZodBridge({schema: ticketSchema});
