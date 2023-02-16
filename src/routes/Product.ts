import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/Product.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { checkRole } from "../middleware/checkRole.js";
import { ProductRoutes } from "../types/Routes.js";

const productRouter = express.Router();

productRouter.get(ProductRoutes.GET, getProducts);
productRouter.post(
  ProductRoutes.CREATE,
  checkJwt,
  checkRole("ADMIN"),
  createProduct
);
productRouter.delete(ProductRoutes.DELETE, deleteProduct);

export default productRouter;
