import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import postRouter from "./post.routes";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/post", postRouter);

export default appRouter;
