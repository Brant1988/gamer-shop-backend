import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import UserAdresses from "../database/models/UserAdresses.js";
import { UserAdressDto, UserAdressRequest } from "../types/UserAdresses.dto.js";

export const getUserAdresses = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = <string>request.headers.authorization?.split(" ")[1];

    const jwtDecoded = <any>jwt.decode(token);

    const { id } = jwtDecoded;
    const userAdresses = await UserAdresses.findOne({
      where: {
        userId: id,
      },
    });

    return response.json(userAdresses);
  } catch (error) {
    next(error);
  }
};

export const createUserAdress = async (
  request: UserAdressRequest<UserAdressDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { city, country, adress, postalCode } = request.body;
    const token = <string>request.headers.authorization?.split(" ")[1];

    const jwtDecoded = <any>jwt.decode(token);

    const { id } = jwtDecoded;
    const userAdresses = await UserAdresses.create({
      city,
      country,
      adress,
      postalCode,
      userId: id,
    });

    return response.json(userAdresses);
  } catch (error) {
    next(error);
  }
};
export const editUserAdress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { ...params } = request.body;
    const token = <string>request.headers.authorization?.split(" ")[1];

    const jwtDecoded = <any>jwt.decode(token);

    const { id } = jwtDecoded;

    await UserAdresses.update(
      { ...params },
      {
        where: {
          userId: id,
        },
      }
    );

    return response.json({ message: "updated" });
  } catch (error) {
    next(error);
  }
};
