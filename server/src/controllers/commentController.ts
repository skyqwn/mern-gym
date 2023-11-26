import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../types/express";

import constant from "../constant";

const prisma = new PrismaClient();

const create = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user,
      params,
      body: { type, desc, id },
    } = req;
    if (type === null) return;
    if (type === "post") {
      const newPostComment = await prisma.comment.create({
        data: {
          desc,
          author: {
            connect: {
              id: user?.id,
              nickname: user?.nickname,
            },
          },
          post: {
            connect: {
              id,
            },
          },
        },
        include: {
          author: {
            select: {
              id: true,
              nickname: true,
              avatar: true,
            },
          },
        },
      });
      console.log(newPostComment);
      return res.status(200).json(newPostComment);
    }
    // //모든 코멘트들을 하나의
    // if (type === "post") {
    // }
    // return res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
  }
};

const fetch = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { postId },
  } = req;
  try {
    const fetchComment = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        },
      },
      orderBy: { createAt: "desc" },
    });
    return res.status(200).json(fetchComment);
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
    params: { postId },
    user,
  } = req;
  console.log(2);
  console.log(postId);
  try {
    const deleteComment = await prisma.comment.delete({
      where: {
        id: postId,
        authorId: user?.id,
      },
    });
    return res.status(200).json(deleteComment);
  } catch (error) {
    console.log(error);
  }
};

export default { create, fetch, remove };
