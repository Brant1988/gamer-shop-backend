import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/Category.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { checkRole } from "../middleware/checkRole.js";
import { CategoryRoutes } from "../types/Routes.js";

const categoryRouter = express.Router();

categoryRouter.get(CategoryRoutes.GET, getCategories);
categoryRouter.post(
  CategoryRoutes.CREATE,
  checkJwt,
  checkRole("ADMIN"),
  createCategory
);
categoryRouter.delete(
  CategoryRoutes.DELETE,
  checkJwt,
  checkRole("ADMIN"),
  deleteCategory
);

export default categoryRouter;
