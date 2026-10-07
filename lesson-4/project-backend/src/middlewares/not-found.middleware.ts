import { type Request, type Response } from "express";

const notFoundMiddleware = (req: Request, res: Response)=> {
    res.status(404).json({
        message: `${req.method} ${req.url} not found`
    });
};

export default notFoundMiddleware;