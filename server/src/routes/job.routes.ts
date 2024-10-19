import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { createJob } from "../controllers/job.controller";
import { validateSchema } from "../middlewares/validate.middleware";
import { createJobSchema } from "../lib/job.schema";

const jobRouter = Router();

jobRouter.post("/", verifyToken, validateSchema(createJobSchema), createJob);

export default jobRouter;
