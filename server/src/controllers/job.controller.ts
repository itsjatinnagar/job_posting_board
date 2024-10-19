import { Request, Response } from "express";
import prisma from "../client";
import { sendJobAlert } from "../lib/email.service";

export const createJob = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, userId: req.user!.id };
    const job = await prisma.job.create({ data, include: { User: true } });
    sendJobAlert(
      job.candidates,
      `Hello user,\n${
        job.User!.companyName
      } has just posted a new job opening and invited you to apply for the same.\n\nTitle: ${
        job.title
      }\nDescription: ${job.description}\nExperience Level: ${
        job.level
      }\nLast Date: ${Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(job.endDate)}`,
      `Job | ${job.title} at ${job.User!.companyName}`,
      job.id
    );
    res.status(201).json({ status: true, message: "Job created successfully" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
