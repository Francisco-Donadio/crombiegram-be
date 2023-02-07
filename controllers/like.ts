import { RequestHandler } from "express";
import Like, { LikeCreationAttributes } from "../models/like.model";

const createLikePost: RequestHandler = async (req, res) => {
  try {
    // const user = res.locals.user;

    const postId = req.params.id;
    const { userId } = req.body;

    const like = await Like.create({
      userId: userId,
      postId: postId,
    });

    if (!like) {
      return res.status(400).json({ message: "Error like" });
    }

    return res.status(202).json({ like });
  } catch (error) {
    return res.json({ error: error });
  }
};

const deleteLikePost: RequestHandler = async (req, res) => {
  try {
    // const user = res.locals.user;
    const postId = req.params.id;
    const { userId } = req.body;

    const like = await Like.destroy({
      where: {
        postId,
        userId,
      },
    });

    if (!like) {
      return res.status(400).json({ message: "Error like" });
    }

    return res.status(202).json({ message: "like has been destroyed" });
  } catch (error) {
    return res.json({ error: error });
  }
};

const getLikesPost: RequestHandler = async (req, res) => {
  try {
    const likeList = await Like.findAll();

    if (!likeList) {
      return res.status(400).json({ message: "Error get liks list." });
    }

    return res.status(202).json(likeList);
  } catch (error) {
    return res.json({ error: error });
  }
};

export default { createLikePost, deleteLikePost, getLikesPost };
