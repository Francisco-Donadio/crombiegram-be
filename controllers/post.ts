import { RequestHandler } from "express";
import Post from "../models/post.model";
import { PostCreationAttributes } from "../models/post.model";
import User from "../models/user.model";
import { uploadFile } from "../libs/s3";

const createPost: RequestHandler = async (req, res) => {
  try {
    const body = req.body as PostCreationAttributes;
    console.log(body);

    if (req.files!.file) {
      const imageName = await uploadFile(req.files!.file);
      console.log({ imageName });

      const post = await Post.create({
        contentText: body.contentText,
        userId: body.userId,
        imageName: imageName.replace(" ", "+"),
      });

      if (!post) {
        return res.status(400).json({ message: "error al crear post" });
      }

      return res.status(400).json({ post });
    } else {
      const post = await Post.create({
        contentText: body.contentText,
        userId: body.userId,
      });
      return res.status(400).json({ post });
    }
  } catch (error) {
    return res.json({ error });
  }
};

export default { createPost };
