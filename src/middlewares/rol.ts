import { NextFunction, Request, Response } from "express";
import { UserEnum } from "../models/nosql/users";
import { handleHttpError } from "../utils/handleError";

const checkRol =
  (roles: UserEnum[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const { user } = req;

      const rolesByUser = user.role;

      const isValid = roles.some((rolSingle) =>
        rolesByUser.includes(rolSingle)
      );

      if (!isValid) {
        return handleHttpError(res, 401, "NOT_PERMISSION");
      }

      next();
    } catch (error: any) {
      handleHttpError(res, 403, "ERROR_PERMISSIONS", error.message);
    }
  };

export default checkRol;
