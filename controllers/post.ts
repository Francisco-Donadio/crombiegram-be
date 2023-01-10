import { RequestHandler } from "express";
import Post from "../models/post.model";
import { PostCreationAttributes } from "../models/post.model";
import User from "../models/user.model";
import { uploadFile } from "../libs/s3";
import Comment from "../models/comment.model";

const createPost: RequestHandler = async (req, res) => {
  try {
    let imageName = undefined;
    const body = req.body as PostCreationAttributes;

    if (req.files) {
      const imageNameUpload = await uploadFile(req.files!.file);
      imageName = imageNameUpload;
    }
    const post = await Post.create({
      contentText: body.contentText,
      userId: body.userId,
      imageName,
    });

    if (!post) return res.status(400).json({ message: "error al crear post" });

    return res.status(202).json({ post });
  } catch (error) {
    return res.json({ error: error });
  }
};

const getAllPost: RequestHandler = async (req, res) => {
  try {
    const postList = await Post.findAll({
      include: [{ model: User, attributes: ["firstName", "lastName"] }],
    });
    return res.status(200).json(postList);
  } catch (error) {
    return res.json({ error: error });
  }
};

const getPostWithComments: RequestHandler = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findOne({
      where: { id: postId },
      include: [{ model: Comment }],
    });

    if (!post) {
      return res.status(400).json({ message: "error al obtener post" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.json({ error: error });
  }
};

export default { createPost, getAllPost, getPostWithComments };
