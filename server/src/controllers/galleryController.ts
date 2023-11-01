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
      body: { title, desc, images },
      file,
      user,
    } = req;
    console.log(req.body.file);
    if (!user) {
      return next(
        createError(constant.ERROR_MESSAGE.NO_EXISTS_USER, constant.STATUS[401])
      );
    }

    const newGallery = await prisma.gallery.create({
      data: {
        title,
        desc,
        thumbnail: "",
        images: [(file as Express.MulterS3.File).location],
        author: {
          connect: {
            id: user?.id,
          },
        },
        // authorId: user.id,
      },
    });

    return res.status(200).json(newGallery);
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
    const galleries = await prisma.gallery.findMany({
      include: { author: { select: { id: true, nickname: true } } },
      orderBy: { createAt: "desc" },
    });
    return res.status(200).json(galleries);
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
    const gallery = await prisma.gallery.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(gallery);
  } catch (error) {
    return next(error);
  }
};

export default { create, fetch, detail };
