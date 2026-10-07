import { type Request, type Response, type NextFunction } from "express";

import HttpError from "../classes/HttpError.ts";

export const checkContacAddBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name || !req.body.email || !req.body.phone)
    throw new HttpError(`name, email and phone required fields`, 400);

  next();
};

export const checkContacUpdateBody = (req: Request, res: Response, next: NextFunction) => {
  if (!Object.keys(req.body).length)
    throw new HttpError(`one of this field required: name, email, phone`, 400);

  next();
};


