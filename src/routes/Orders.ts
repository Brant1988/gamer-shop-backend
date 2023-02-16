import express from "express";
import {
  createOrder,
  getOrders,
  editOrder,
  createAuthOrder,
} from "../controllers/Orders.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { OrdersRoutes } from "../types/Routes.js";

const ordersRouter = express.Router();

ordersRouter.post(OrdersRoutes.CREATE, createOrder);
ordersRouter.post(OrdersRoutes.CREATE_AUTH, checkJwt, createAuthOrder);
ordersRouter.get(OrdersRoutes.GET, checkJwt, getOrders);
ordersRouter.patch(OrdersRoutes.PROCESS, checkJwt, editOrder);

export default ordersRouter;
