import { Router } from "express";
import login from "../controllers/auth/login";
import register from "../controllers/auth/register";

const authRouter = Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);

export default authRouter;
