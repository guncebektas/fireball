import {z} from 'zod';
import {ZodBridge} from "uniforms-bridge-zod";

export const faqsSchema = z.object({
  _id: z.string().optional(),
  question: z.string(),
  answer: z.string(),
  order: z.number()
});

export const faqsFormSchema = z.object({
  question: z.string(),
  answer: z.string(),
  order: z.number()
});

export const faqsBridge = new ZodBridge({schema: faqsFormSchema});
