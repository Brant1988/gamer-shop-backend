import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const signJwt = (id: string, email: string, role: string) => {
  const secretKey = process.env.SECRET_KEY as string;

  return jwt.sign({ id, email, role }, secretKey, {
    expiresIn: "12h",
  });
};
