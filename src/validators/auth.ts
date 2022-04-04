import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

export const validatorRegisterItem = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("age").exists().notEmpty().isNumeric(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 120 }),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

export const validatorLoginItem = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 120 }),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];
