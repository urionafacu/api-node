import { NextFunction, Request, Response } from 'express';
import { UserRolEnum } from 'types/user';
import { handleHttpError } from 'utils/handleError';

const checkRol = (roles: UserRolEnum[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentUser } = req;

    const rolesByUser = currentUser.toJSON().role!;

    const isValid = roles.some(rolSingle => rolesByUser.includes(rolSingle));

    if (!isValid) {
      return handleHttpError(res, 401, 'NOT_PERMISSION');
    }

    return next();
  } catch (error: any) {
    return handleHttpError(res, 403, 'ERROR_PERMISSIONS', error.message);
  }
};

export default checkRol;
