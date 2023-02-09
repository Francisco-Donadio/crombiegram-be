import { Router } from "express";
import post from "../controllers/post";
import authMiddleware from "../middleware/auth";
import upload from "../libs/s3";

const postRouter = Router();

postRouter.get("/", authMiddleware, post.getAllPost);
// postRouter.get("/:id", authMiddleware, post.getPostWithComments);
postRouter.post("/", authMiddleware, upload.single("image"), post.createPost);
postRouter.delete("/:id", authMiddleware, post.deletePost);
postRouter.get("/contact/:id", authMiddleware, post.getPostById);
postRouter.get("/me", authMiddleware, post.getMyPosts);

export default postRouter;
