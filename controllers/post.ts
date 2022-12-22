import { RequestHandler } from "express";
import Post from "../models/post.model";
import { PostCreationAttributes } from "../models/post.model";

const createPost: RequestHandler = async (req, res) => {
  try {
    const body = req.body as PostCreationAttributes;
  } catch (error) {}
};
