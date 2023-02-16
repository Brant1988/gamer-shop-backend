import { Response, NextFunction, Request } from "express";
import UserPeronal from "../database/models/UserPersonalInfo.js";
import {
  UserPersonalDto,
  UserPersonalRequest,
} from "../types/UserPersonal.dto.js";
import jwt from "jsonwebtoken";

export const getUserPersonal = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = <string>request.headers.authorization?.split(" ")[1];

    const jwtDecoded = <any>jwt.decode(token);

    const { id } = jwtDecoded;
    const userPersonal = await UserPeronal.findOne({
      where: {
        userId: id,
      },
    });

    return response.json(userPersonal);
  } catch (error) {
    next(error);
  }
};

export const createUserPersonal = async (
  request: UserPersonalRequest<UserPersonalDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, surname, phoneNumber } = request.body;
    const token = <string>request.headers.authorization?.split(" ")[1];

    const jwtDecoded = <any>jwt.decode(token);

    const { id } = jwtDecoded;
    const userPersonal = await UserPeronal.create({
      name,
      surname,
      phoneNumber,
      userId: id,
    });

    return response.json(userPersonal);
  } catch (error) {
    next(error);
  }
};

export const editUserPersonal = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { ...params } = request.body;
    const token = <string>request.headers.authorization?.split(" ")[1];

    const jwtDecoded = <any>jwt.decode(token);

    const { id } = jwtDecoded;
    await UserPeronal.update(
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
