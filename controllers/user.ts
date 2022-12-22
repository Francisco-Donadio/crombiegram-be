import User, { UserCreationAttributes } from "../models/user.model";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";

const getMe: RequestHandler = async (req, res) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

const updateUser: RequestHandler = async (req, res) => {
  try {
    const { email, username, password, repeatPassword } = req.body;

    const user = res.locals.user;

    if (password != repeatPassword) {
      return res.status(400).json({ message: "password not match" });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds).then(async (hash) => {
      try {
        await User.update(
          { email, username, password: hash },
          { where: { id: user.id } }
        );

        return res.json({ message: "Your account has been updated!" });
      } catch (error) {
        return res.status(400).json(error);
      }
    });
  } catch (error) {
    return res.json({ error });
  }
};

export default { getMe, updateUser };
