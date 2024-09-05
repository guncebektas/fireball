import {z} from 'zod';
import {ZodBridge} from 'uniforms-bridge-zod';
import {SUBJECT_OPTIONS} from "../enums/subjectOptions";

export const contactFormSchema = {
  name: z.string(),
  phoneNumber: z
    .string()
    .regex(/^\+\d{1,12}$/, {
      message: 'Phone number must start with "+" and be up to 13 digits long.',
    }),
  email: z.string().email(),
  subject: z.enum(SUBJECT_OPTIONS),
  message: z.string(),
};

export const contactSchema = z.object(contactFormSchema);

export const contactBridge = new ZodBridge({schema: contactSchema});
