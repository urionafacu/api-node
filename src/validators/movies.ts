import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import validateResults from 'utils/handleValidator';

// eslint-disable-next-line import/prefer-default-export
export const validatorRegisterItem = [
  check('id').notEmpty().isLength({ min: 1, max: 99 }),
  (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next),
];
