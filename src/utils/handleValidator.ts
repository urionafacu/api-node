import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validateResults = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error: any) {
    return res.status(403).send({ errors: error.array() });
  }
};

export default validateResults;
