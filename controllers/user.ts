import User, { UserCreationAttributes } from "../models/user.model";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import dotEnv from "dotenv";
dotEnv.config();

const getMe: RequestHandler = async (req, res) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

const updateUser: RequestHandler = async (req, res) => {
  if (req.file) {
    console.log(req.file);
  }
  try {
    const {
      email,
      lastName,
      firstName,
      password,
      repeatPassword,
      profileImage,
      position,
    } = req.body;

    let finalPosition = undefined;
    if (position) {
      finalPosition = position;
    }
    const user = res.locals.user;

    if (password != repeatPassword) {
      return res.status(400).json({ message: "password not match" });
    }

    bcrypt
      .hash(password, Number(process.env.SALT_ROUNDS))
      .then(async (hash) => {
        try {
          await User.update(
            { email, firstName, lastName, password: hash, profileImage },
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

const updateImage: RequestHandler = async (req, res) => {
  try {
    const body = req.body as UserCreationAttributes;

    const user = res.locals.user;

    let profileImage = body.profileImage;

    if (req.file) {
      //@ts-ignore
      profileImage = req.file.key;
    }

    const userUpdated = await User.update(
      {
        profileImage,
      },
      {
        where: { id: user.id },
      }
    );

    if (!profileImage)
      return res.status(400).json({ message: "error al actualizar foto" });

    return res.status(200).json({ userUpdated });
  } catch (error) {
    return res.json({ error: error });
  }
};

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const usersList = await User.findAll({ order: [["firstName", "ASC"]] });
    console.log("This is the list of users", usersList);
    return res.status(200).json(usersList);
  } catch (error) {
    return res.json({ error: error });
  }
};

export default { getMe, updateUser, getAllUsers, updateImage };
