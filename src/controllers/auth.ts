import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { UsersModel } from 'models';
import { encrypt, compare } from 'utils/handlePassword';
import { handleHttpError } from 'utils/handleError';
import { tokenSign } from 'utils/handleJwt';

export const registerController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const body = matchedData(req);
    const encryptedPassword = await encrypt(body.password);
    const newBody = { ...body, password: encryptedPassword };
    const dataUser = await UsersModel.create(newBody);

    dataUser.set({ password: undefined });

    const newDataUser = dataUser.toJSON();

    const data = {
      token: tokenSign(newDataUser),
      user: newDataUser,
    };

    return res.status(201).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_IN_REGISTER', error.message);
  }
};

export const loginController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const body = matchedData(req);
    const user = await UsersModel.findOne({
      where: { email: body.email },
    });

    if (!user) {
      return handleHttpError(res, 404, 'USER_NOT_FOUND');
    }

    // @ts-ignore
    const isValidPassword = await compare(body.password, user.password);

    if (!isValidPassword) {
      return handleHttpError(res, 401, 'INVALID_PASSWORD');
    }

    // @ts-ignore
    user.set({ password: undefined });

    const data = {
      // @ts-ignore
      token: tokenSign(user),
      user,
    };

    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_IN_LOGIN', error.message);
  }
};
