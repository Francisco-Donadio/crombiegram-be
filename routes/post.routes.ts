import { Router } from "express";
import post from "../controllers/post";
import authMiddleware from "../middleware/auth";
import upload from "../libs/s3";

const postRouter = Router();

postRouter.get("/", post.getAllPost);
postRouter.get("/:id", post.getPostWithComments);
postRouter.post("/", authMiddleware, upload.single("image"), post.createPost);

export default postRouter;
