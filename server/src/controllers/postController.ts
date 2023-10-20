import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../types/express";
import createError from "../util/createError";
import constant from "../constant";

const prisma = new PrismaClient();

const create = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { title, desc, category },
      user,
    } = req;

    if (!user) {
      return next(
        createError(constant.ERROR_MESSAGE.NO_EXISTS_USER, constant.STATUS[401])
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        category,
        authorId: user.id,
      },
    });

    return res.status(200).json(newPost);
  } catch (error) {
    return next(error);
  }
};

const fetch = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createAt: "desc" },
    });
    return res.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};
export default { create, fetch };
