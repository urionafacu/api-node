import jwt from 'jsonwebtoken';
import { UserModel } from 'types/user';

const { JWT_SECRET } = process.env;

export type User = { id: string } & Omit<UserModel, 'password'>;

export const tokenSign = (user: User) => {
  const sign = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET!,
    {
      expiresIn: '1d',
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
