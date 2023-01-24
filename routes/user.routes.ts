import { Router } from "express";
import user from "../controllers/user";
import upload from "../libs/s3";
import authMiddleware from "../middleware/auth";

const userRouter = Router();

userRouter.get("/me", authMiddleware, user.getMe);
userRouter.put("/me", user.updateUser);
userRouter.post(
  "/me/image",
  authMiddleware,
  upload.single("profileImage"),
  user.updateImage
);
userRouter.get("/network", user.getAllUsers);

export default userRouter;
