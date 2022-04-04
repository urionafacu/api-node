import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { TracksModel } from "../models";
import { handleHttpError } from "../utils/handleError";
import { TracksModel as TrackModelType } from "../models/nosql/tracks";

/**
 * Get all tracks
 */
export const getItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = await TracksModel.find({});
    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, "ERROR_GET_TRACKS", error.message);
  }
};

/**
 * Get a track by id
 */
export const getItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = matchedData(req);
    const data: TrackModelType | null = await TracksModel.findById(id);

    if (!data) {
      return handleHttpError(res, 404, "TRACK_NOT_FOUND");
    }

    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, "ERROR_GET_TRACK", error.message);
  }
};

/**
 * Create a new track
 */
export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body = matchedData(req);
  try {
    const data: TrackModelType = await TracksModel.create(body);
    return res.status(201).json({ data });
  } catch (error: any) {
    return handleHttpError(res, 500, "ERROR_IN_CREATE_TRACK", error.message);
  }
};

/**
 * Update a track by id
 */
export const updateItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, ...body } = matchedData(req);

    const data: TrackModelType | null = await TracksModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!data) {
      return handleHttpError(res, 404, "TRACK_NOT_FOUND");
    }
    return res.status(200).json(data);
  } catch (error: any) {
    return handleHttpError(res, 500, "ERROR_IN_UPDATE_TRACK", error.message);
  }
};

/**
 * Delete a track by id
 */
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = matchedData(req);
    // @ts-ignore
    const data = await TracksModel.delete({ _id: id });

    if (!data) {
      return handleHttpError(res, 404, "TRACK_NOT_FOUND");
    }
    return res.status(204).json({});
  } catch (error: any) {
    return handleHttpError(res, 500, "ERROR_IN_DELETE_TRACK", error.message);
  }
};
