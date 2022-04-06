import { NextFunction, Request, Response } from 'express';
import { verifyToken } from 'utils/handleJwt';
import { handleHttpError } from 'utils/handleError';
import { UsersModel } from 'models';

interface TokenInterface {
  id: number;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return handleHttpError(res, 401, 'NOT_TOKEN');
    }

    const token = req.headers.authorization.split(' ').pop();

    const dataToken = verifyToken(token!) as TokenInterface;

    if (!dataToken!.id) {
      return handleHttpError(res, 401, 'INVALID_TOKEN');
    }

    const user = await UsersModel.findByPk(dataToken.id);

    if (user) {
      req.currentUser = user;
    }

    return next();
  } catch (error: any) {
    return handleHttpError(res, 401, 'NOT_SESSION', error.message);
  }
};

export default authMiddleware;
