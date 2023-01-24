import { Router } from "express";
import user from "../controllers/user";
import authMiddleware from "../middleware/auth";

const userRouter = Router();

userRouter.get("/me", authMiddleware, user.getMe);
userRouter.put("/me", authMiddleware, user.updateUser);
userRouter.get("/network", user.getAllUsers);

export default userRouter;
