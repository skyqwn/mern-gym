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
      body: { type, desc, postId, galleryId },
    } = req;
    console.log(req.body);
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
              id: postId,
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
      return res.status(200).json(newPostComment);
    }
    if (type === "gallery") {
      console.log(type);
      const newGalleryComment = await prisma.comment.create({
        data: {
          desc,
          author: {
            connect: {
              id: user?.id,
              nickname: user?.nickname,
            },
          },
          gallery: {
            connect: {
              id: galleryId,
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
      return res.status(200).json(newGalleryComment);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchGalleryComment = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { galleryId },
  } = req;
  try {
    const fetchGalleryComment = await prisma.comment.findMany({
      where: {
        galleryId,
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
    return res.status(200).json(fetchGalleryComment);
  } catch (error) {
    return next(error);
  }
};

const fetchPostComment = async (
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
const updatePostComment = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { commentId, desc },
    user,
  } = req;
  try {
    const updatePostComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        desc,
        author: {
          connect: {
            id: user?.id,
            nickname: user?.nickname,
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
    return res.status(200).json(updatePostComment);
  } catch (error) {
    return next(error);
  }
};
const updateGalleryComment = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { commentId, desc },
    user,
  } = req;
  try {
    const updateGalleryComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        desc,
        author: {
          connect: {
            id: user?.id,
            nickname: user?.nickname,
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
    return res.status(200).json(updateGalleryComment);
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
const galleryRemoveComment = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { galleryId },
    user,
  } = req;
  console.log(req.params);
  try {
    const deleteComment = await prisma.comment.delete({
      where: {
        id: galleryId,
        authorId: user?.id,
      },
    });
    return res.status(200).json(deleteComment);
  } catch (error) {
    console.log(error);
  }
};

export default {
  create,
  remove,
  fetchPostComment,
  fetchGalleryComment,
  updatePostComment,
  updateGalleryComment,
  galleryRemoveComment,
};
