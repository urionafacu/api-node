import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

export const validatorCreateItem = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 90 }),
  check("album").exists().notEmpty().isLength({ min: 3, max: 90 }),
  check("cover").exists().notEmpty().isLength({ min: 3, max: 90 }),
  check("artist.name").exists().notEmpty().isLength({ min: 3, max: 90 }),
  check("artist.nickname").exists().notEmpty().isLength({ min: 3, max: 90 }),
  check("artist.nationality").exists().notEmpty().isLength({ min: 1, max: 12 }),
  check("duration.start").exists().notEmpty().isNumeric(),
  check("duration.end").exists().notEmpty().isNumeric(),
  check("mediaId").exists().notEmpty().isMongoId(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

export const validatorGetItem = [
  check("id").exists().notEmpty().isMongoId(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];
