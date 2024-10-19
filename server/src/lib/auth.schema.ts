import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    mobile: z.string().length(10),
    role: z.enum(["applicant", "company"]),
    password: z.string().min(8),
    companyName: z.string().min(1),
    employeeSize: z.number().int().min(1),
  })
  .strict();

export const verifyUserSchema = z.object({
  mode: z.enum(["email", "mobile"]),
  code: z.string().length(6),
});
