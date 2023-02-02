import User, { UserCreationAttributes } from "../models/user.model";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import dotEnv from "dotenv";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

dotEnv.config();

const getMeProfile: RequestHandler = async (req, res) => {
  const user = res.locals.user;

  try {
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const userPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "profileImage", "position"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName", "profileImage", "position"],
            },
          ],
        },
      ],
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ user, userPosts });
  } catch (error) {
    return res.json({ error: error });
  }
};

const updateUser: RequestHandler = async (req, res) => {
  try {
    const { email, lastName, firstName, profileImage, position, birthday } =
      req.body;

    let finalPosition = undefined;
    if (position) {
      finalPosition = position;
    }
    const user = res.locals.user;

    try {
      await User.update(
        { email, firstName, lastName, profileImage, birthday },
        { where: { id: user.id } }
      );

      return res.json({ message: "Your account has been updated!" });
    } catch (error) {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.json({ error });
  }
};

const updatePassword: RequestHandler = async (req, res) => {
  try {
    const { currPassword, newPassword, repeatedNewPassword } = req.body;
    const user = res.locals.user;

    const userData = await User.findByPk(user.id);

    if (!userData) return res.status(400).json({ message: "Invalid user" });

    const match = await bcrypt.compare(currPassword, userData.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (newPassword != repeatedNewPassword) {
      return res.status(400).json({ message: "New password not match" });
    }

    bcrypt
      .hash(newPassword, Number(process.env.SALT_ROUNDS))
      .then(async (hash) => {
        try {
          await User.update({ password: hash }, { where: { id: user.id } });

          return res.json({ message: "Your password has been updated!" });
        } catch (error) {
          return res.status(400).json(error);
        }
      });
  } catch (error) {
    return res.json({ error });
  }
};

const updateProfileImage: RequestHandler = async (req, res) => {
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


const getUserById: RequestHandler = async (req, res) => {
  const userId = req.params.id;

  try {
    const contact = await User.findByPk(userId, {
      include: [
        {
          model: Post,
        },
      ],
    });
    return res.status(200).json(contact);
  } catch (error) {
    return res.json({ error: error });
  }
};

export default {
  getMe,
  updateUser,
  getAllUsers,
  updateImage,
  updatePassword,
  getUserById,

};
