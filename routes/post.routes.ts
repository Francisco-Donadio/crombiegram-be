import { Router } from "express";
import post from "../controllers/post";

const postRouter = Router();

postRouter.get("/:id", post.getPostWithComments);
postRouter.post("/", post.createPost);

export default postRouter;
