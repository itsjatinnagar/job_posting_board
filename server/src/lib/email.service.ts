import nodemailer from "nodemailer";
import prisma from "../client";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function sendEmail(body: string, to: string) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Email OTP Verification",
    text: body,
  });
}

export function sendJobAlert(
  emails: string[],
  body: string,
  subject: string,
  jobId: string
) {
  return emails.map(async (email) => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: body,
      });
      await prisma.emailLog.create({
        data: {
          jobId,
          recipient: email,
          status: "sent",
        },
      });
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
      await prisma.emailLog.create({
        data: {
          jobId,
          recipient: email,
          status: "failed",
        },
      });
    }
  });
}
