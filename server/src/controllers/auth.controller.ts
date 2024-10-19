import type { Request, Response } from "express";
import prisma from "../client";
import bcrypt from "bcryptjs";
import { cookieOptions, generateCode } from "../lib/utils";
import sendSMS from "../lib/mobile.service";
import { sendEmail } from "../lib/email.service";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, mobile, role, password, companyName, employeeSize } =
    req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      res.status(400).json({ status: false, message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailCode = generateCode();
    const mobileCode = generateCode();
    const newUser = await prisma.user.create({
      data: {
        companyName,
        email,
        employeeSize,
        mobile,
        name,
        role,
        password: hashedPassword,
        emailCode,
        mobileCode,
      },
      select: {
        companyName: true,
        email: true,
        emailVerified: true,
        employeeSize: true,
        id: true,
        mobile: true,
        mobileVerified: true,
        name: true,
        role: true,
      },
    });

    await sendEmail(`Your Cuvette verification code is: ${emailCode}`, email);
    await sendSMS(`Your Cuvette verification code is: ${mobileCode}`, mobile);
    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY!, {
      expiresIn: "1h",
    });
    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      status: true,
      message: "Registered Successfully",
      user: newUser,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const verify = async (req: Request, res: Response) => {
  const { mode, code } = req.body;
  const user = req.user!;
  try {
    switch (mode) {
      case "email":
        if (user.emailCode !== code) {
          res
            .status(400)
            .json({ status: true, verified: false, message: "Invalid code" });
          return;
        }
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: true, emailCode: null },
        });
        res.status(200).json({
          status: true,
          verified: true,
          message: "Email verified successfully",
        });
        return;
      case "mobile":
        if (user.mobileCode !== code) {
          res
            .status(400)
            .json({ status: true, verified: false, message: "Invalid code" });
          return;
        }
        await prisma.user.update({
          where: { id: user.id },
          data: { mobileVerified: true, mobileCode: null },
        });
        res.status(200).json({
          status: true,
          verified: true,
          message: "Mobile verified successfully",
        });
        return;
      default:
        res.status(400).json({ status: false, message: "Invalid mode" });
        return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ status: true, message: "Logged out successfully" });
};
