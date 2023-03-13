import { RequestHandler } from "express";
import Comment, { CommentCreationAttributes } from "../models/comment.model";
import User from "../models/user.model";

const getPostComments: RequestHandler = async (req, res) => {
  const postId = req.params.id;

  const { page, size } = req.query;
  const finalLimit = Number(size) || 5;
  const finalOffset = Number(page) * Number(size);

  // console.log(finalLimit, finalOffset);
  try {
    const { count, rows } = await Comment.findAndCountAll({
      where: { postId: postId },
      distinct: true,
      limit: finalLimit,
      offset: finalOffset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "profileImage", "position"],
        },
      ],
    });
    const totalPages = Math.ceil(count / finalLimit);

    return res.status(200).json(rows);
  } catch (error) {
    return res.json({ error: error });
  }
};

const createCommentPost: RequestHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const body = req.body as CommentCreationAttributes;
    const postId = req.params.id;

    const comment = await Comment.create({
      userId: user.id,
      postId: postId,
      comment: body.comment,
    });
    if (!comment) {
      return res.status(400).json({ message: "error al crear comentario" });
    }

    return res.status(202).json(comment);
  } catch (error) {
    return res.json({ error: error });
  }
};

const deleteCommentPost: RequestHandler = async (req, res) => {
  try {
    const commentId = req.params.id;
    const user = res.locals.user;

    const comment = await Comment.destroy({
      where: { id: commentId, userId: user.id },
    });

    if (!comment) {
      return res.status(400).json({ message: "error delete comment" });
    }
    return res.status(202).json({ message: "comment deleted" });
  } catch (error) {
    return res.json({ error: error });
  }
};

export default {
  getPostComments,
  createCommentPost,
  deleteCommentPost,
};
