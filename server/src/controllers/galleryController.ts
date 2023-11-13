import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../types/express";
import createError from "../util/createError";
import constant from "../constant";
import s3PutImage from "../libs/s3PutImage";

const prisma = new PrismaClient();

const create = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { title, desc, images },
      user,
    } = req;
    if (!user) {
      return next(
        createError(constant.ERROR_MESSAGE.NO_EXISTS_USER, constant.STATUS[401])
      );
    }
    const multerFiles = req.files as {
      [fieldName: string]: Express.Multer.File[];
    };

    const data = { ...req.body, images: new Array(), authorId: user.id };

    for (let i = 0; i < multerFiles.files.length; i++) {
      const location = await s3PutImage({
        folderName: title,
        type: "GALLERY",
        file: multerFiles.files[i],
        resizeWidth: 1280,
      });
      if (i === 0) {
        data.thumbnail = location;
      }
      data.images.push(location);
    }

    // multerFiles.files.map(async (file: Express.Multer.File) => {
    //   const location = await s3PutImage({
    //     folderName: title,
    //     type: "GALLERY",
    //     file,
    //     resizeWidth: 1280,
    //   });
    //   console.log(location);
    // });

    const newGallery = await prisma.gallery.create({
      data: { ...data },
      include: { author: { select: { id: true, nickname: true } } },
    });

    // const newGallery = await prisma.gallery.create({
    //   data: {
    //     title,
    //     desc,
    //     thumbnail: "",
    //     images: [files as any],
    //     author: {
    //       connect: {
    //         id: user?.id,
    //       },
    //     },
    //     // authorId: user.id,
    //   },
    // });

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
      include: { author: { select: { id: true, nickname: true } } },
    });

    console.log(gallery);
    res.status(200).json(gallery);
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
    body: { title, desc, images },
    files,
    user,
  } = req;
  try {
    if (!user) {
      return next(
        createError(constant.ERROR_MESSAGE.NO_EXISTS_USER, constant.STATUS[401])
      );
    }

    const multerFiles = req.files as {
      [fieldName: string]: Express.Multer.File[];
    };

    const imageLocations = typeof images === "string" ? [images] : [...images];
    if (multerFiles.files) {
      for (let i = 0; i < multerFiles.files.length; i++) {
        const location = await s3PutImage({
          folderName: title,
          type: "GALLERY",
          file: multerFiles.files[i],
          resizeWidth: 1280,
        });
        imageLocations.push(location);
      }
    }
    const updateGallery = await prisma.gallery.update({
      where: {
        id,
      },
      data: {
        title,
        desc,
        images: imageLocations,
        thumbnail: imageLocations[0],
      },
      include: { author: { select: { id: true, nickname: true } } },
    });
    return res.status(200).json(updateGallery);
  } catch (error) {
    return next(error);
  }
};
const remove = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {};

export default { create, fetch, detail, edit, remove };
