import { RequestHandler } from "express";
import Post from "../models/post.model";
import Comment, { CommentCreationAttributes } from "../models/comment.model";

const CreateCommentPost: RequestHandler = async (req, res) => {
  try {
    const body = req.body as CommentCreationAttributes;

    const comment = await Comment.create({
      userId: body.userId,
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

export default { CreateCommentPost };
