import { Router } from "express";
import post from "../controllers/post";
import authMiddleware from "../middleware/auth";

const postRouter = Router();

postRouter.get("/", post.getAllPost);
postRouter.get("/:id", post.getPostWithComments);
postRouter.post("/", authMiddleware, post.createPost);

export default postRouter;
