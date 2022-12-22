import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { json } from "sequelize";
import jwt from "jsonwebtoken";
import User from "../../models/user.model";

type Body = {
  email: string;
  password: string;
};

const saltRounds = 10;

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

    bcrypt.compare(body.password, user.password).then(function (isSame) {
      if (isSame) {
        const payload = {
          email: user.email,
          id: user.id,
        };
        const token = jwt.sign(payload, "gj383fh13sf8");

        return res.status(200).json({ payload: { token } });
      } else {
        return res.status(400).json({ message: "User or password is invalid" });
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default login;
