import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { handleHttpError } from 'utils/handleError';
import { MoviesModel } from 'models';

/**
 * Get all movies
 */
export const getItems = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await MoviesModel.findAll();
    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_GET_MOVIES', error.message);
  }
};

/**
 * Get a movie by id
 */
export const getItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = matchedData(req);
    const data = await MoviesModel.findByPk(id);

    if (!data) {
      return handleHttpError(res, 404, 'TRACK_NOT_FOUND');
    }

    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_GET_TRACK', error.message);
  }
};

/**
 * Create a new movie
 */
export const createItem = async (req: Request, res: Response): Promise<Response> => {
  const body = matchedData(req);
  try {
    const data = await MoviesModel.create(body);
    return res.status(201).json({ data });
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_IN_CREATE_TRACK', error.message);
  }
};

/**
 * Update a movie by id
 */
export const updateItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, ...body } = matchedData(req);

    const data = await MoviesModel.update(body, {
      where: { id },
    });

    if (!data) {
      return handleHttpError(res, 404, 'TRACK_NOT_FOUND');
    }
    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_IN_UPDATE_TRACK', error.message);
  }
};

/**
 * Delete a movie by id
 */
export const deleteItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = matchedData(req);
    // @ts-ignore
    const data = await MoviesModel.destroy({
      where: { id },
    });

    if (!data) {
      return handleHttpError(res, 404, 'TRACK_NOT_FOUND');
    }
    return res.status(204).json({});
  } catch (error: any) {
    return handleHttpError(res, 500, 'ERROR_IN_DELETE_TRACK', error.message);
  }
};
