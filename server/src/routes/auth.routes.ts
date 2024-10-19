import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware";
import { createUserSchema, verifyUserSchema } from "../lib/auth.schema";
import { logout, register, verify } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", validateSchema(createUserSchema), register);
authRouter.post(
  "/verify",
  verifyToken,
  validateSchema(verifyUserSchema),
  verify
);
authRouter.post("/logout", logout);

export default authRouter;
