import { NextFunction, Request, Response } from "express";

const customHeader = (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (error) {
    res.status(500).json({ error: "Error in header" });
  }
};

export default customHeader;
