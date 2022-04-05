/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import validateResults from '../utils/handleValidator';

export const validatorGetItem = [
  check('id').exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next),
];
