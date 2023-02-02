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

export default { createCommentPost };
