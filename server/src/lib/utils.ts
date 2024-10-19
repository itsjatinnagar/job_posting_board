import { CookieOptions } from "express";

export const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};
