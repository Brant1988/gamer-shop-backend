import express from "express";
import brandRouter from "./Brand.js";
import categoryRouter from "./Category.js";
import productInfoRouter from "./ProductInfo.js";
import productRouter from "./Product.js";
import userAdressesRouter from "./UserAdresses.js";
import userPersonalRouter from "./UserPersonal.js";
import userRouter from "./User.js";
import productImagesRouter from "./ProductImages.js";
import ordersRouter from "./Orders.js";
import shopsRouter from "./Shops.js";

const router = express.Router();

router.use("/", categoryRouter);
router.use("/", productRouter);
router.use("/", userRouter);
router.use("/", productInfoRouter);
router.use("/", brandRouter);
router.use("/", userPersonalRouter);
router.use("/", userAdressesRouter);
router.use("/", productImagesRouter);
router.use("/", ordersRouter);
router.use("/", shopsRouter);

export default router;
