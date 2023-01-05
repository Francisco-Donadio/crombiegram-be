import { RequestHandler } from "express";
import Post from "../models/post.model";
import { PostCreationAttributes } from "../models/post.model";
import User from "../models/user.model";
import { uploadFile } from "../libs/s3";
import Comment from "../models/comment.model";

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

      return res.status(202).json({ post });
    }

    const post = await Post.create({
      contentText: body.contentText,
      userId: body.userId,
    });
    return res.status(202).json({ post });
  } catch (error) {
    return res.json({ error: error });
  }
};

const getAllPost: RequestHandler = async (req, res) => {
  try {
    const postArray = await Post.findAll();
    return res.status(200).json({ postArray });
  } catch (error) {}
};

const getPostWithComments: RequestHandler = async (req, res) => {
  const postId = req.params.id;

  console.log(postId);
  try {
    const post = await Post.findOne({
      where: { id: postId },
      include: [{ model: Comment, where: { postId: postId } }],
    });
    return res.status(200).json(post);
  } catch (error) {}
};

export default { createPost, getAllPost, getPostWithComments };
