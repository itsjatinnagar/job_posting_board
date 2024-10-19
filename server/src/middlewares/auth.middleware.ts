import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../client";

interface TokenPayload extends JwtPayload {
  id: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as TokenPayload;
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      res.status(404).json({ status: false, message: "User Not Found" });
      return;
    }
    req["user"] = user;
    next();
  } catch (error) {
    res.status(401).json({ status: false, message: "Internal Server Error" });
    return;
  }
};
