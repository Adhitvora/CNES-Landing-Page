import { z } from "zod";

export const franchiseFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(80, "Name is too long."),
  mobile: z
    .string()
    .trim()
    .regex(/^(?:\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian mobile number."),
  email: z.string().trim().email("Enter a valid email address."),
  city: z.string().trim().min(2, "Please enter your city.").max(80, "City is too long."),
  profession: z.string().min(1, "Select your current profession."),
  investmentRange: z.string().min(1, "Select an investment range."),
  message: z.string().trim().min(20, "Please share at least 20 characters.").max(1000, "Message is too long."),
});
