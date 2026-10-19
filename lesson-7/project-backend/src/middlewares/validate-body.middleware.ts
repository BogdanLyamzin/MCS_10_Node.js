import { z } from "zod";
import { type Request, type Response, type NextFunction } from "express";

const validateBody = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid body",
        issues: result.error.issues,
      });
    }
    req.body = result.data;
    next();
  };
};

export default validateBody;
