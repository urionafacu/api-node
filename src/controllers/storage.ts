import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import fs from 'fs';
import { StoragesModel } from 'models';
import { handleHttpError } from 'utils/handleError';

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Get all files
 */
export const getItems = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await StoragesModel.findAll();
    return res.status(200).send(data);
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_GET_ITEMS', error.message);
  }
};

/**
 * Get a file by id
 */
export const getItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = matchedData(req);
    const data = await StoragesModel.findByPk(id);

    if (!data) {
      return handleHttpError(res, 404, 'ITEM_NOT_FOUND');
    }
    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_GET_ITEMS', error.message);
  }
};

/**
 * Create a new file
 */
export const createItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { file } = req;

    const fileData = {
      filename: file?.filename,
      url: `${PUBLIC_URL}/${file?.filename}`,
    };

    const data = await StoragesModel.create(fileData);
    return res.status(201).send({ data });
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_IN_CREATE_ITEM', error.message);
  }
};

/**
 * Delete a file by id
 */
export const deleteItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = matchedData(req);
    const data = await StoragesModel.findByPk(id);

    if (!data) {
      return handleHttpError(res, 404, 'ITEM_NOT_FOUND');
    }

    const filePath = `${MEDIA_PATH}/${data.toJSON().filename}`;

    fs.unlinkSync(filePath);

    await StoragesModel.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_DELETE_ITEM', error.message);
  }
};
