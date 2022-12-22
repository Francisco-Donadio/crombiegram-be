import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

type Payload = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
};

const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const token = req.headers.authorization.split(" ")[1];
    var payload = jwt.verify(token, "gj383fh13sf8") as Payload;

    const user = await User.findByPk(payload.id);

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
