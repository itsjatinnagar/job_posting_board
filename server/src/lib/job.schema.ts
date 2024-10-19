import { z } from "zod";

export const createJobSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    level: z.enum(["Entry Level", "Mid Level", "Senior Level"]),
    candidates: z.array(z.string().email()),
    endDate: z.coerce.date(),
  })
  .strict();
