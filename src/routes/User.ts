import express from "express";
import { confirmAuth, loginUser, registerUser } from "../controllers/User.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { UserRoutes } from "../types/Routes.js";

const userRouter = express.Router();

userRouter.post(UserRoutes.REGISTER, registerUser);
userRouter.post(UserRoutes.LOGIN, loginUser);
userRouter.get(UserRoutes.AUTH, checkJwt, confirmAuth);

export default userRouter;
