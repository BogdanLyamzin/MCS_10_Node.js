import { z } from "zod";
import { type Request, type Response, type NextFunction } from "express";

const validateId = (schema: z.ZodType<{id: unknown}>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid id",
        issues: result.error.issues,
      });
    }
    res.locals.id = result.data.id;
    next();
  };
};

export default validateId;
