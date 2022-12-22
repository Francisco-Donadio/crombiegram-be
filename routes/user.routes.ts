import { Router } from "express";
import user from "../controllers/user";
import authMiddleware from "../middleware/auth";

const userRouter = Router();

userRouter.get("/me", authMiddleware, user.getMe);
userRouter.post("/me", authMiddleware, user.updateUser);

export default userRouter;
