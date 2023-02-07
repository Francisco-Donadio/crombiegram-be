import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import postRouter from "./post.routes";
import commentRouter from "./comment.routes";
import likeRouter from "./like.routes";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/post", postRouter);
appRouter.use("/comment", commentRouter);
appRouter.use("/like", likeRouter);

export default appRouter;
