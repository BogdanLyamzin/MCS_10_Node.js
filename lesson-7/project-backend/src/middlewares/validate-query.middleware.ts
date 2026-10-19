import { z } from "zod";
import { type Request, type Response, type NextFunction } from "express";

const validateQuery = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid query",
        issues: result.error.issues,
      });
    }
    req.locals = {};
    req.locals.query = result.data;
    next();
  };
};

export default validateQuery;
