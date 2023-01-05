import { RequestHandler } from "express";
import Post from "../models/post.model";
import { PostCreationAttributes } from "../models/post.model";
import User from "../models/user.model";
import { uploadFile } from "../libs/s3";

const createPost: RequestHandler = async (req, res) => {
  try {
    const body = req.body as PostCreationAttributes;

    if (req.files) {
      const imageName = await uploadFile(req.files!.file);

      const post = await Post.create({
        contentText: body.contentText,
        userId: body.userId,
        imageName: imageName.replace(" ", "+"),
      });

      if (!post) {
        return res.status(400).json({ message: "error al crear post" });
      }

      return res.status(400).json({ post });
    }

    const post = await Post.create({
      contentText: body.contentText,
      userId: body.userId,
    });
    return res.status(400).json({ post });
  } catch (error) {
    return res.json({ error: error });
  }
};

export default { createPost };
