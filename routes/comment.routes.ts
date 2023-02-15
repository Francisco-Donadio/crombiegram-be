import { Router } from "express";
import comment from "../controllers/comment";
import authMiddleware from "../middleware/auth";

const commentRouter = Router();

// commentRouter.get("/me", authMiddleware, comment.getMe);
//commentRouter.get("/", authMiddleware, comment.getHomePostsComments);
commentRouter.get("/post/:id", authMiddleware, comment.getPostComments);
commentRouter.post("/post/:id", authMiddleware, comment.createCommentPost);
commentRouter.delete("/:id", authMiddleware, comment.deleteCommentPost);

export default commentRouter;
