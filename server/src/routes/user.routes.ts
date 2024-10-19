import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/me", verifyToken, (req, res) => {
  res.status(200).json({ status: true, user: req.user });
  return;
});

export default userRouter;
