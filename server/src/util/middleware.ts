import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "../libs/jwt";
import createError from "./createError";
import constant from "../constant";

const onlyUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(
      createError(constant.ERROR_MESSAGE.NO_EXISTS_TOKEN, constant.STATUS[401])
    );
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; //access token

    if (!token)
      return next(
        createError(
          constant.ERROR_MESSAGE.NO_EXISTS_TOKEN,
          constant.STATUS[401]
        )
      );

    const id = jwt.verifyAccessToken(token);

    if (!id)
      return next(
        createError(constant.ERROR_MESSAGE.ACCESS_TOKEN, constant.STATUS[401])
      );

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({ where: { id } });
    console.log(user);

    if (!user) {
      return next(
        createError(constant.ERROR_MESSAGE.NO_EXISTS_USER, constant.STATUS[401])
      );
    }

    //@ts-ignore
    req.user = user;

    next();
  } catch (error: any) {
    return next(
      createError(constant.ERROR_MESSAGE.SERVER, constant.STATUS[500])
    );
  }
};

export default onlyUser;
