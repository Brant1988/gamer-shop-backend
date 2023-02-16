import express from "express";
import {
  createUserPersonal,
  editUserPersonal,
  getUserPersonal,
} from "../controllers/UserPersonal.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { UserPersonalRoutes } from "../types/Routes.js";

const userPersonalRouter = express.Router();

userPersonalRouter.post(
  UserPersonalRoutes.CREATE,
  checkJwt,
  createUserPersonal
);
userPersonalRouter.get(UserPersonalRoutes.GET, checkJwt, getUserPersonal);
userPersonalRouter.patch(UserPersonalRoutes.EDIT, checkJwt, editUserPersonal);

export default userPersonalRouter;
