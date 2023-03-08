import { RequestHandler } from "express";
import Post from "../models/post.model";
import { PostCreationAttributes } from "../models/post.model";
import User from "../models/user.model";
import Comment from "../models/comment.model";
import Like from "../models/like.model";
import { Sequelize } from "sequelize-typescript";

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
  const { page, size } = req.query;
  const finalLimit = Number(size) || 10;
  const finalOffset = (Number(page) - 1) * Number(size) || 0;
  try {
    const { count, rows } = await Post.findAndCountAll({
      distinct: true,
      limit: finalLimit,
      offset: finalOffset,
      include: [
        {
          model: Comment,
          limit: 3,
          order: [["createdAt", "DESC"]],

          include: [
            {
              model: User,
              attributes: ["firstName", "lastName", "profileImage", "position"],
            },
          ],
        },
        {
          model: User,
          attributes: ["firstName", "lastName", "profileImage", "position"],
        },
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log(finalLimit, finalOffset);
    const totalPages = Math.ceil(count / finalLimit);
    return res.status(200).json({ totalCount: count, postList: rows });
  } catch (error) {
    return res.json({ error: error });
  }
};

const getPostWithComments: RequestHandler = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName", "profileImage", "position"],
            },
          ],
        },
        { model: User, attributes: ["firstName", "lastName", "profileImage"] },
      ],
    });

    if (!post) {
      return res.status(400).json({ message: "error al obtener post" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.json({ error: error });
  }
};

const deletePost: RequestHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const { id } = req.params;
    const post = await Post.destroy({
      where: { id: id, userId: user.id },
    });
    return res.status(200).json({ message: "post deleted" });
  } catch (error) {
    return res.json({ error: error });
  }
};

const getPostById: RequestHandler = async (req, res) => {
  const userId = req.params.id;
  try {
    const postList = await Post.findAll({
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName", "profileImage", "position"],
            },
          ],
        },
        {
          model: User,
          attributes: ["firstName", "lastName", "profileImage", "position"],
        },
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
      ],
      where: { userId },
      order: [
        ["createdAt", "DESC"],
        [{ model: Comment, as: "comment" }, "createdAt", "ASC"],
      ],
    });
    return res.status(200).json(postList);
  } catch (error) {
    return res.json({ error: error });
  }
};

const getMyPosts: RequestHandler = async (req, res) => {
  const user = res.locals.user;

  try {
    const myPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "profileImage", "position"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName", "profileImage", "position"],
            },
          ],
        },
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
      ],
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(myPosts);
  } catch (error) {
    return res.json({ error: error });
  }
};

export default {
  createPost,
  getAllPost,
  getPostWithComments,
  deletePost,
  getPostById,
  getMyPosts,
};
