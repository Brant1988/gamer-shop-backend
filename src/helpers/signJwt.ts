import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const signJwt = (id: string, email: string, role: string) => {
  const secretKey = "slkdfn25223lkkj523nsdvmnxqabm3478asdad21da";

  return jwt.sign({ id, email, role }, secretKey, {
    expiresIn: "12h",
  });
};
