import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers.authorization?.split(" ")[1];
  const secretKey = "slkdfn25223lkkj523nsdvmnxqabm3478asdad21da";

  const jwtPayload = <any>jwt.verify(token, secretKey);

  if (!jwtPayload) throw Error("Not authorized!");

  const { userId, email, role } = jwtPayload;

  const newToken = jwt.sign({ userId, email, role }, secretKey, {
    expiresIn: "1 day",
  });
  res.setHeader("token", newToken);

  next();
};
