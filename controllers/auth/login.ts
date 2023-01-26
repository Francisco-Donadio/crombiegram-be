import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { json } from "sequelize";
import jwt from "jsonwebtoken";
import User from "../../models/user.model";
import dotEnv from "dotenv";
dotEnv.config();
import cookie, { serialize } from "cookie";

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
    // console.log(userToken);
    // res.setHeader("Set-Cookie", "isLoggedin=true");
    const payload = {
      email: user.email,
      id: user.id,
    };
    const match = await bcrypt.compare(body.password, user.password);

    if (match) {
      const token = jwt.sign(payload, process.env.JTW_SECRET_AUTH as string);
      const serialized = serialize("userToken", token, {
        // httpOnly: true,
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      res.setHeader("Set-Cookie", serialized);
      return res.status(200).json({
        message: "Login successful",
      });
      // return res.status(200).json({ payload: { token } });
    } else {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default login;
