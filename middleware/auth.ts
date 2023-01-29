import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import dotEnv from "dotenv";
dotEnv.config();
import cookie from "cookie";

type Payload = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
};

const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;

    if (!authToken) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // const token = req.headers.authorization.split(" ")[1];
    var payload = jwt.verify(
      authToken,
      process.env.JTW_SECRET_AUTH as string
    ) as Payload;

    console.log(payload);
    const user = await User.findByPk(payload.id);
    console.log(user);
    if (!user) {
      throw new Error("user not founds");
    }

    res.locals.user = user;
    res.locals.user.password = undefined;
    next();
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export default authMiddleware;
