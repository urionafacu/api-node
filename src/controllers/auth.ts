import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { encrypt, compare } from "../utils/handlePassword";
import { UsersModel as UsersModelType } from "../models/nosql/users";
import { UsersModel } from "../models";
import { handleHttpError } from "../utils/handleError";
import { tokenSign } from "../utils/handleJwt";

export const registerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const body = matchedData(req);
    const encryptedPassword = await encrypt(body.password);
    const newBody = { ...body, password: encryptedPassword };
    const dataUser: UsersModelType = await UsersModel.create(newBody);
    // @ts-ignore
    dataUser.set({ password: undefined });

    const data = {
      // @ts-ignore
      token: tokenSign(dataUser),
      user: dataUser,
    };

    return res.status(201).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, "ERROR_IN_REGISTER", error.message);
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const body = matchedData(req);
    const user: UsersModelType | null = await UsersModel.findOne({
      email: body.email,
    }).select("+password");

    if (!user) {
      return handleHttpError(res, 404, "USER_NOT_FOUND");
    }

    const isValidPassword = await compare(body.password, user.password);

    if (!isValidPassword) {
      return handleHttpError(res, 401, "INVALID_PASSWORD");
    }

    // @ts-ignore
    user.set({ password: undefined });

    const data = {
      // @ts-ignore
      token: await tokenSign(user),
      user,
    };

    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, "ERROR_IN_LOGIN", error.message);
  }
};
