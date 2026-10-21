import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";

import prisma from "../db.ts";

import HttpError from "../classes/HttpError.ts";

// const salt = await bcrypt.genSalt(10);
// console.log(salt);
// const passwordHash = await bcrypt.hash("12345678", 10);
// console.log(passwordHash);
// const compareResult1 = await bcrypt.compare("12345678", passwordHash);
// console.log(compareResult1);
// const compareResult2 = await bcrypt.compare("12345679", passwordHash);
// console.log(compareResult2);

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (user) throw new HttpError("Username already exist", 409);

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { username, passwordHash },
    select: { id: true, username: true, createdAt: true },
  });

  res.status(201).json(newUser);
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if(!user) throw new HttpError("Invalid username or password", 401);

  const passwordCompare = await bcrypt.compare(password, user.passwordHash);
  if(!passwordCompare) throw new HttpError("Invalid username or password", 401);

  req.session.regenerate(error => {
    if(error) return next(error);

    req.session.userId = user.id;
    req.session.save(error => {
        if(error) return next(error);
        res.json({
            message: "Login successfully"
        })
    });
  });
};

/*
sid: iX66joDwBil7eryW-EMmcgq6glmiUzo1,
{"cookie":{"originalMaxAge":86400000,
"expires":"2026-10-22T18:27:19.406Z",
"secure":false,"httpOnly":true,"path":"/","sameSite":"none"},"userId":5}
*/
/*
hDL1EKTOIxkpA_hyu15rFPoZfYD6iejx,
{"cookie":{"originalMaxAge":86400000,"expires":"2026-10-22T18:33:03.532Z","secure":false,"httpOnly":true,"path":"/","sameSite":"none"},"userId":5}
*/