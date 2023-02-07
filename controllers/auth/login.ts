import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.model";
import dotEnv from "dotenv";
dotEnv.config();

type Body = {
  email: string;
  password: string;
};

const login: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Body;

    const user = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (!user || !body.password) {
      return res.status(400).json({ message: "User or password is invalid" });
    }

    // const { userToken } = req.cookies;

    const payload = {
      email: user.email,
      id: user.id,
    };
    const match = await bcrypt.compare(body.password, user.password);

    if (match) {
      const token = jwt.sign(payload, process.env.JTW_SECRET_AUTH as string);

      const nowDate = new Date();
      return res.status(200).json({
        payload: {
          authCookie: token,
          expires: nowDate.setDate(nowDate.getDate() + 7),
        },
        message: "Login successful",
      });
    } else {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default login;
