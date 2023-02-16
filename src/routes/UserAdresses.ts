import express from "express";
import {
  createUserAdress,
  editUserAdress,
  getUserAdresses,
} from "../controllers/UserAdresses.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { UserAdressesRoutes } from "../types/Routes.js";

const userAdressesRouter = express.Router();

userAdressesRouter.post(UserAdressesRoutes.CREATE, checkJwt, createUserAdress);
userAdressesRouter.get(UserAdressesRoutes.GET, checkJwt, getUserAdresses);
userAdressesRouter.patch(UserAdressesRoutes.EDIT, checkJwt, editUserAdress);
export default userAdressesRouter;
