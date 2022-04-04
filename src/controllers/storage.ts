import { Request, Response } from "express";
import { StorageModel } from "../models";
import { handleHttpError } from "../utils/handleError";

const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:3000";

/**
 * Get all files
 */
export const getItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = await StorageModel.find({});
    return res.status(200).send(data);
  } catch (error: any) {
    return handleHttpError(res, 500, "ERROR_GET_ITEMS", error.message);
  }
};

/**
 * Get a file by id
 */
export const getItem = (req: Request, res: Response): void => {};

/**
 * Create a new file
 */
export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { file } = req;

    const fileData = {
      filename: file?.filename,
      url: `${PUBLIC_URL}/${file?.filename}`,
    };

    const data = await StorageModel.create(fileData);
    return res.status(201).send({ data });
  } catch (error: any) {
    return handleHttpError(res, 500, "ERROR_IN_CREATE_ITEM", error.message);
  }
};

/**
 * Update a file by id
 */
export const updateItem = (req: Request, res: Response): void => {};

/**
 * Delete a file by id
 */
export const deleteItem = (req: Request, res: Response): void => {};
