import { Request, Response, NextFunction } from "express";
import User from "../database/models/User.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { signJwt } from "../helpers/signJwt.js";
import bcrypt from "bcrypt";
import { UserDto, UserRequest } from "../types/User.dto.js";

export const registerUser = async (
  request: UserRequest<UserDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;

    const candidate = await User.findOne({
      where: {
        email,
      },
    });

    if (candidate) throw Error("User already exist");

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
    });
    const token = signJwt(user.id, user.email, user.role);
    return response.json(token);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw Error("Email or password are incorrect");

    const isPassWordCorrect = await bcrypt.compare(password, user.password);

    if (!isPassWordCorrect) throw Error("Email or password are incorrect");

    const token = signJwt(user.id, user.email, user.role);
    return response.json(token);
  } catch (error) {
    next(error);
  }
};

export const confirmAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response.json({
      message: "Token has been refreshed",
    });
  } catch (error) {
    next(error);
  }
};
