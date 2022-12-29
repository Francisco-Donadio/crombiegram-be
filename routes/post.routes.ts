import { Router } from "express";
import post from "../controllers/post";

const postRouter = Router();

postRouter.post("/", post.createPost);

export default postRouter;
