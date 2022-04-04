import jwt from "jsonwebtoken";
import { UsersModel } from "../models/nosql/users";

const JWT_SECRET = process.env.JWT_SECRET;

export type User = { _id: string } & Omit<UsersModel, "password">;

export const tokenSign = (user: User) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  return sign;
};

/**
 * @param tokenJwt
 */
export const verifyToken = (tokenJwt: string) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET!);
  } catch (error) {
    return null;
  }
};
