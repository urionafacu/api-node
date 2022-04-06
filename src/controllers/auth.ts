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
    const newBody = {
      password: encryptedPassword,
      name: body.name as string,
      age: body.age as number,
      email: body.email as string,
    };
    const dataUser = await UsersModel.create(newBody);

    const newDataUser = dataUser.toJSON();

    const data = {
      token: tokenSign(newDataUser),
      user: newDataUser,
    };

    dataUser.set({ password: undefined });
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

    const isValidPassword = await compare(body.password, user.toJSON().password!);

    if (!isValidPassword) {
      return handleHttpError(res, 401, 'INVALID_PASSWORD');
    }

    user.set({ password: undefined });

    const data = {
      token: tokenSign(user.toJSON()),
      user,
    };

    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_IN_LOGIN', error.message);
  }
};
