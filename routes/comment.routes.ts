import { Router } from "express";
import comment from "../controllers/comment";
import authMiddleware from "../middleware/auth";

const commentRouter = Router();

// commentRouter.get("/me", authMiddleware, comment.getMe);
commentRouter.post("/", authMiddleware, comment.createCommentPost);

export default commentRouter;
