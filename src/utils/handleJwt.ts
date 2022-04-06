import jwt from 'jsonwebtoken';
import { ModelAttributes as UserModel } from 'models/users';

const { JWT_SECRET } = process.env;

export const tokenSign = (user: UserModel) => {
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

export const verifyToken = (tokenJwt: string) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET!);
  } catch (error) {
    return null;
  }
};
