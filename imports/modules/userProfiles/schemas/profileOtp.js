import {z} from "zod";

export const profileOtp = z.object({
  otp: z.string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must be numeric"),
})
