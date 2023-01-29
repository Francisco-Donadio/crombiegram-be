import { Router } from "express";
import login from "../controllers/auth/login";
import register from "../controllers/auth/register";
import revalidateToken from "../controllers/auth/revalidateToken";

const authRouter = Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.post("/revalidate", revalidateToken);

export default authRouter;
