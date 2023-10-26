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
        author: {
          connect: {
            id: user?.id,
          },
        },
        // authorId: user.id,
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
      include: { author: { select: { id: true, nickname: true } } },
      orderBy: { createAt: "desc" },
    });
    return res.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};

const detail = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
  } = req;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

const edit = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
    body: { title, desc, category },
  } = req;
  try {
    const newPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        desc,
        category,
      },
    });
    return res.status(200).json(newPost);
  } catch (error) {
    return next(error);
  }
};

const remove = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
  } = req;
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id,
      },
    });
    return res.status(200).json(deletePost);
  } catch (error) {
    return next(error);
  }
};
export default { create, fetch, detail, edit, remove };
