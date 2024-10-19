import { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { success, error } = schema.safeParse(req.body);
    if (!success) {
      res.status(401).json({
        status: false,
        error: error.errors
          .map((t) => `${t.path[0] ?? ""}: ${t.message}`)
          .join(", "),
      });
    } else {
      next();
    }
  };
