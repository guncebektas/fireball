import {z} from 'zod';
import {ZodBridge} from "uniforms-bridge-zod";

export const faqsSchema = z.object({
  _id: z.string().optional(),
  question: z.string(),
  answer: z.string()
});

export const faqsFormSchema = z.object({
  question: z.string(),
  answer: z.string()
});

export const faqsBridge = new ZodBridge({schema: faqsFormSchema});
