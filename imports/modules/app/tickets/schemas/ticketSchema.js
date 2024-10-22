import {z} from 'zod';
import {ZodBridge} from 'uniforms-bridge-zod';
import {SUBJECT_OPTIONS} from "../enums/subjectOptions";

export const ticketSchema = z.object({
  _id: z.string().optional(),
  level: z.enum(SUBJECT_OPTIONS),
  message: z.string(),
  response: z.string().optional(),
});

export const ticketAddFormSchema = z.object({
  level: z.enum(SUBJECT_OPTIONS),
  message: z.string(),
});

export const ticketAddBridge = new ZodBridge({schema: ticketAddFormSchema});

export const ticketEditFormSchema = z.object({
  level: z.enum(SUBJECT_OPTIONS),
  message: z.string(),
  response: z.string(),
});

export const ticketEditBridge = new ZodBridge({schema: ticketEditFormSchema});
