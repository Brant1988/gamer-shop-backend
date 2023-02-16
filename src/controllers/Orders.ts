import { NextFunction, Request, Response } from "express";
import Orders from "../database/models/Orders.js";
import { OrdersDto, OrdersRequest } from "../types/Orders.dto.js";
import jwt from "jsonwebtoken";
import Products from "../database/models/Products.js";
import AmountOrderedProducts from "../database/models/AmountOrderedProducts.js";
import User from "../database/models/User.js";
import ProductImages from "../database/models/ProductImages.js";
import Brands from "../database/models/Brands.js";

export const getOrders = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { limit = 3, page = 1 } = request.query;
    const token = <string>request.headers.authorization?.split(" ")[1];

    const jwtDecoded = <any>jwt.decode(token);

    const { id } = jwtDecoded;
    const orders = await Orders.findAndCountAll({
      limit: Number(limit),
      offset: Number(limit) * (Number(page) - 1),
      distinct: true,
      where: {
        userId: id,
      },
      include: [
        {
          model: Products,
          include: [AmountOrderedProducts, ProductImages, Brands],
        },
      ],
    });
    return response.json(orders);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  request: OrdersRequest<OrdersDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      status = "Created",
      phone,
      city,
      country,
      postalCode,
      adress,
      delivery,
      userName,
      userSurname,
      summary,
      products,
    } = request.body;

    const isUserExist = await User.findOne({
      where: {
        email,
      },
    });
    if (isUserExist) throw Error(`Account ${email} exist please sign in`);

    const newOrder = await Orders.create({
      email,
      phone,
      city,
      country,
      postalCode,
      adress,
      delivery,
      userName,
      userSurname,
      summary,
      status,
    });

    if (products.length) {
      const productIds = products.map((product) => {
        return product.id;
      });
      await newOrder.$add("products", productIds);
      const createNewAmounts = async () => {
        return Promise.all(
          products.map(async (product) => {
            const newAmount = await AmountOrderedProducts.create({
              amount: product.amount,
              productId: product.id,
            });
            return newAmount;
          })
        );
      };
      const newAmounts = await createNewAmounts();
      if (newAmounts) {
        const amountIds = newAmounts.map((amount) => {
          return amount.id;
        });
        newOrder.$add("amounts", amountIds);
      }
    }
    return response.json({
      id: newOrder.id,
      message: `Order № ${newOrder.id} has been created`,
    });
  } catch (error) {
    next(error);
  }
};
export const createAuthOrder = async (
  request: OrdersRequest<OrdersDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      status = "created",
      phone,
      city,
      country,
      postalCode,
      adress,
      delivery,
      userName,
      userSurname,
      summary,
      products,
    } = request.body;

    const token = <string>request.headers.authorization?.split(" ")[1];
    const user = <any>jwt.decode(token);

    const newOrder = await Orders.create({
      email: user.email,
      phone,
      city,
      country,
      postalCode,
      adress,
      delivery,
      userName,
      userSurname,
      userId: user.id,
      summary,
      status,
    });

    if (products.length) {
      const productIds = products.map((product) => {
        return product.id;
      });
      await newOrder.$add("products", productIds);
      const createNewAmounts = async () => {
        return Promise.all(
          products.map(async (product) => {
            const newAmount = await AmountOrderedProducts.create({
              amount: product.amount,
              productId: product.id,
            });
            return newAmount;
          })
        );
      };
      const newAmounts = await createNewAmounts();
      if (newAmounts) {
        const amountIds = newAmounts.map((amount) => {
          return amount.id;
        });
        newOrder.$add("amounts", amountIds);
      }
    }
    return response.json({
      id: newOrder.id,
      message: `Order № ${newOrder.id} has been created`,
    });
  } catch (error) {
    next(error);
  }
};
export const editOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id, status } = request.body;

    await Orders.update(
      { status },
      {
        where: {
          id,
        },
      }
    );

    return response.json({ message: "updated" });
  } catch (error) {
    next(error);
  }
};
