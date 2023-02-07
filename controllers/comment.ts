import { RequestHandler } from "express";
import Comment, { CommentCreationAttributes } from "../models/comment.model";

const createCommentPost: RequestHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const body = req.body as CommentCreationAttributes;

    const comment = await Comment.create({
      userId: user.id,
      postId: body.postId,
      comment: body.comment,
    });

    if (!comment) {
      return res.status(400).json({ message: "error al crear comentario" });
    }

    return res.status(202).json({ comment });
  } catch (error) {
    return res.json({ error: error });
  }
};

const deleteCommentPost: RequestHandler = async (req, res) => {
  try {
    const commentId = req.params.id;
    const user = res.locals.user;
    const body = req.body as CommentCreationAttributes;

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

export default { createCommentPost, deleteCommentPost };
