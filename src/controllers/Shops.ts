import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import Shops from "../database/models/Shops.js";
import UserAdresses from "../database/models/UserAdresses.js";
import { UserAdressDto, UserAdressRequest } from "../types/UserAdresses.dto.js";

export const getShops = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const shops = await Shops.findAll({});

    return response.json(shops);
  } catch (error) {
    next(error);
  }
};

export const createShop = async (
  request: UserAdressRequest<UserAdressDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { city, country, adress, postalCode } = request.body;

    const userAdresses = await Shops.create({
      city,
      country,
      adress,
      postalCode,
    });

    return response.json(userAdresses);
  } catch (error) {
    next(error);
  }
};
export const deleteShop = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.body;

    await Shops.destroy({
      where: {
        id,
      },
    });

    return response.json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
};
