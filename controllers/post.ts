import { RequestHandler } from "express";
import Post from "../models/post.model";
import { PostCreationAttributes } from "../models/post.model";
import { S3Controller } from "../libs/s3Client";

const createPost: RequestHandler = async (req, res) => {
  try {
    const s3 = new S3Controller();
    s3.uploadFile("holas");
    const body = req.body as PostCreationAttributes;
  } catch (error) {}
};

export default { createPost };
