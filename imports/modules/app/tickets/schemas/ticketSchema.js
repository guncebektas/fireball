import {z} from 'zod';
import {ZodBridge} from 'uniforms-bridge-zod';
import {SUBJECT_OPTIONS} from "../enums/subjectOptions";

export const ticketSchema = z.object({
  _id: z.string().optional(),
  level: z.enum(SUBJECT_OPTIONS),
  message: z.string(),
  response: z.string(),
});

export const ticketFormSchema = z.object({
  level: z.enum(SUBJECT_OPTIONS),
  message: z.string(),
  response: z.string(),
});

export const ticketBridge = new ZodBridge({schema: ticketFormSchema});
