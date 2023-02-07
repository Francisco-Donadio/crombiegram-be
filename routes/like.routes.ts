import { Router } from "express";
import like from "../controllers/like";
import authMiddleware from "../middleware/auth";

const likeRouter = Router();

likeRouter.get("/post/:id", authMiddleware, like.getLikesPost);
likeRouter.post("/post/:id", authMiddleware, like.createLikePost);
likeRouter.delete("/post/:id", authMiddleware, like.deleteLikePost);

export default likeRouter;
