import { type Request, type Response, type NextFunction } from "express";

import HttpError from "../classes/HttpError.ts";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error instanceof HttpError ? error.status : 500;
  res.status(status).json({
    message: error.message,
  });
};

export default errorMiddleware;
