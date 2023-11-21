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
            nickname: user?.nickname,
          },
        },

        // authorId: user.id,
      },
      include: {
        author: {
          select: {
            nickname: true,
          },
        },
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
  const {
    query: { page = 1 },
  } = req;
  try {
    const allPosts = await prisma.post.count();
    const take = 5;
    const totalPage = Math.ceil(allPosts / take);
    const fetchPost = await prisma.post.findMany({
      take,
      skip: 5 * (+page! - 1),
      include: { author: { select: { id: true, nickname: true } } },
      orderBy: { createAt: "desc" },
    });
    return res.status(200).json({ fetchPost, totalPage });
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
    user,
  } = req;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    const isLiked = Boolean(
      await prisma.fav.findFirst({
        where: {
          postId: post?.id,
          authorId: user?.id,
        },
        select: {
          id: true,
        },
      })
    );

    res.status(200).json({ post, isLiked });
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

const fav = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const alreadyExists = await prisma.fav.findFirst({
      where: {
        // postId: id,
        authorId: user?.id,
      },
    });

    if (alreadyExists) {
      //delete
      await prisma.fav.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      //create
      await prisma.fav.create({
        data: {
          author: {
            connect: {
              id: user?.id,
            },
          },
          post: {
            connect: {
              id,
            },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default { create, fetch, detail, edit, remove, fav };
