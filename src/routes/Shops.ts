import express from "express";
import { createShop, deleteShop, getShops } from "../controllers/Shops.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { checkRole } from "../middleware/checkRole.js";
import { ShopRoutes } from "../types/Routes.js";

const shopsRouter = express.Router();

shopsRouter.post(ShopRoutes.CREATE, checkJwt, checkRole("ADMIN"), createShop);
shopsRouter.get(ShopRoutes.GET, getShops);
shopsRouter.delete(ShopRoutes.DELETE, checkJwt, checkRole("ADMIN"), deleteShop);

export default shopsRouter;
