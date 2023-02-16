import express from "express";
import { createBrand, editBrand, getBrands } from "../controllers/Brand.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { checkRole } from "../middleware/checkRole.js";
import { BrandRoutes } from "../types/Routes.js";

const brandRouter = express.Router();

brandRouter.get(BrandRoutes.GET, getBrands);
brandRouter.post(BrandRoutes.CREATE, createBrand);
brandRouter.patch(BrandRoutes.EDIT, checkJwt, checkRole("ADMIN"), editBrand);

export default brandRouter;
