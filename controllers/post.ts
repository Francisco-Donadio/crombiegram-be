import { RequestHandler } from "express";
import Post from "../models/post.model";
import { PostCreationAttributes } from "../models/post.model";
import User from "../models/user.model";
import Comment from "../models/comment.model";

const createPost: RequestHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const body = req.body as PostCreationAttributes;

    let imageName = undefined;

    if (req.file) {
      // @ts-ignore
      imageName = req.file.key;
    }

    const post = await Post.create({
      contentText: body.contentText,
      userId: user.id,
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
      include: [
        { model: User, attributes: ["firstName", "lastName", "profileImage"] },
      ],
      order: [["createdAt", "DESC"]],
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

const deleteImage: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const post = await Post.destroy({
    where: { id },
  });
  return res.status(200).json(post);
};

export default { createPost, getAllPost, getPostWithComments, deleteImage };
