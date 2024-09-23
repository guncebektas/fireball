import {z} from 'zod';
import {ZodBridge} from 'uniforms-bridge-zod';
import {SUBJECT_OPTIONS} from "../enums/subjectOptions";

export const ticketFormSchema = {
  level: z.enum(SUBJECT_OPTIONS),
  message: z.string(),
  response: z.string(),
};

export const ticketSchema = z.object(ticketFormSchema);

export const ticketBridge = new ZodBridge({schema: ticketSchema});
