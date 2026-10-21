import { Router } from "express";

import { registerSchema, loginSchema } from "../validation/auth.validation.ts";

import validateBody from "../middlewares/validate-body.middleware.ts";

import { registerUser, loginUser } from "../controllers/auth.controller.ts";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerUser);

authRouter.post("/login", validateBody(loginSchema), loginUser);

export default authRouter;