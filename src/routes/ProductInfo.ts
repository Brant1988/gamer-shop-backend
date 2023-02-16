import express from "express";
import {
  createProductInfoDescription,
  deleteProductInfoDescription,
} from "../controllers/ProductInfoDescription.js";
import {
  createProductInfoTitle,
  deleteProductInfoTitle,
  getProductInfos,
} from "../controllers/ProductInfoTitle.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { checkRole } from "../middleware/checkRole.js";
import { ProductInfoRoutes } from "../types/Routes.js";

const productInfoRouter = express.Router();

productInfoRouter.get(ProductInfoRoutes.GET, getProductInfos);
productInfoRouter.post(
  ProductInfoRoutes.TITLE_CREATE,
  checkJwt,
  checkRole("ADMIN"),
  createProductInfoTitle
);
productInfoRouter.post(
  ProductInfoRoutes.DESCRIPTION_CREATE,
  checkJwt,
  checkRole("ADMIN"),
  createProductInfoDescription
);

productInfoRouter.delete(
  ProductInfoRoutes.TITLE_DELETE,
  checkJwt,
  checkRole("ADMIN"),
  deleteProductInfoTitle
);

productInfoRouter.delete(
  ProductInfoRoutes.DESCRIPTION_DELETE,
  checkJwt,
  checkRole("ADMIN"),
  deleteProductInfoDescription
);

export default productInfoRouter;
