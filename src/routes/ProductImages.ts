import express from "express";
import {
  createProductImage,
  deleteProductImage,
} from "../controllers/ProductImage.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { checkRole } from "../middleware/checkRole.js";
import { upload } from "../middleware/multerUpload.js";
import { ProductImages } from "../types/Routes.js";

const productImagesRouter = express.Router();

productImagesRouter.post(
  ProductImages.CREATE,
  checkJwt,
  checkRole("ADMIN"),
  upload.single("file"),
  createProductImage
);
productImagesRouter.delete(
  ProductImages.DELETE,
  checkJwt,
  checkRole("ADMIN"),
  deleteProductImage
);

export default productImagesRouter;
