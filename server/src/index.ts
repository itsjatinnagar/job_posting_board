import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import jobRouter from "./routes/job.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

app.use("/auth", authRouter);
app.use("/profile", userRouter);
app.use("/jobs", jobRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server ready at: http://localhost:${PORT}`)
);
