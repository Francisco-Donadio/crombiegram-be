import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);

export default appRouter;
