import { RequestHandler } from "express";

import jwt from "jsonwebtoken";
import User from "../../models/user.model";
import dotEnv from "dotenv";
dotEnv.config();

type userDataPayloadType = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
};

const revalidateToken: RequestHandler = async (req, res) => {
  try {
    const authToken = req.cookies.authToken;

    var userDataPayload = jwt.verify(
      authToken,
      process.env.JTW_SECRET_AUTH as string
    ) as userDataPayloadType;

    const user = await User.findByPk(userDataPayload.id);

    if (!user) {
      return res.status(400).json({ message: "User is invalid" });
    }

    const newToken = jwt.sign(
      userDataPayload,
      process.env.JTW_SECRET_AUTH as string
    );

    const nowDate = new Date();
    return res.status(200).json({
      payload: {
        authCookie: newToken,
        expires: nowDate.setDate(nowDate.getDate() + 7),
      },
      message: "revalidate successful",
    });
    // return res.status(200).json({ payload: { token } });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default revalidateToken;
