import { Gallery, Post, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "../libs/jwt";
import oauth from "../libs/oauth";
import createError from "../util/createError";
import CONSTANT from "../constant";
import { RequestWithUser } from "../../types/express";
import s3PutImage from "../libs/s3PutImage";

dotenv.config();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

const prisma = new PrismaClient();

const SALT_ROUND = +process.env.SALT_ROUND!;

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { email: bodyEmail, password },
    } = req;
    if (!bodyEmail || !password) {
      return next(
        createError(
          CONSTANT.ERROR_MESSAGE.REQUIERED_INPUT,
          CONSTANT.STATUS[500]
        )
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: bodyEmail },
    });

    if (!user) {
      return next(
        createError(CONSTANT.ERROR_MESSAGE.SIGNIN_ERROR, CONSTANT.STATUS[500])
      );
      // return res
      //   .status(500)
      //   .json({ message: "이메일과 비밀번호를 확인하세요" });
    }

    const checkedPassword = bcrypt.compareSync(
      password,
      user.password as string
    );

    if (!checkedPassword) {
      return next(
        createError(CONSTANT.ERROR_MESSAGE.SIGNIN_ERROR, CONSTANT.STATUS[500])
      );
      // return res
      //   .status(500)
      //   .json({ message: "이메일과 비밀번호를 확인하세요" });
    }

    const accessToken = jwt.signAccessToken(user.id);
    const refreshToken = jwt.signRefreshToken();

    const tokenUser = await prisma.user.update({
      where: { email: bodyEmail },
      data: {
        refreshToken,
      },
      select: {
        email: true,
        nickname: true,
        id: true,
        avatar: true,
        posts: true,
        galleries: true,
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(200).json({
      ...tokenUser,
      accessToken,
    });
  } catch (error) {
    return next(error);
    // return res.status(500).json({ message: "로그인중 서버에러" });
  } finally {
    await prisma.$disconnect();
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { email, nickname, password, verifyPassword },
    } = req;
    if (!email || !nickname || !password || !verifyPassword) {
      return next(
        createError(
          CONSTANT.ERROR_MESSAGE.REQUIERED_INPUT,
          CONSTANT.STATUS[500]
        )
      );
      // return res.status(500).json({ message: "빈칸 다 채워주세요" });
    }
    if (password !== verifyPassword) {
      return next(
        createError(
          CONSTANT.ERROR_MESSAGE.UNMATCH_VERIFY_PASSWORD,
          CONSTANT.STATUS[500]
        )
      );
      // return res.status(500).json({ message: "비밀번호를 같게 입력해주세요" });
    }

    const existUser = await prisma.user.findUnique({ where: { email } });

    if (existUser) {
      return next(
        createError(CONSTANT.ERROR_MESSAGE.EXISTS_EMAIL, CONSTANT.STATUS[500])
      );
    }

    const hashedPw = bcrypt.hashSync(password, SALT_ROUND);

    const newUser = await prisma.user.create({
      data: { email, nickname, password: hashedPw },
    });
    return res.status(200).json({ newUser });
  } catch (error) {
    return next(error);
  } finally {
    await prisma.$disconnect();
  }
};

const logout = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("refreshToken");
    res.send("remove cookie");
  } catch (error) {
    console.log(error);
  }
};

const edit = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { id, nickname, previewImage },
    } = req;
    let updateData = { id, nickname } as any;
    const multerFiles = req.files as {
      [fieldName: string]: Express.Multer.File[];
    };
    if (multerFiles.file) {
      const location = await s3PutImage({
        folderName: nickname,
        type: "USER",
        file: multerFiles.file[0],
        resizeWidth: 1280,
      });
      updateData.avatar = location;
    }
    if (!previewImage) {
      updateData.avatar = "";
    }

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: updateData,
      select: {
        nickname: true,
        id: true,
        avatar: true,
        posts: true,
        galleries: true,
      },
    });
    return res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.refreshToken) {
    const {
      cookies: { refreshToken },
    } = req;
    try {
      const ok = jwt.verifyRefreshToken(refreshToken);

      if (!ok) {
        return next(
          createError(
            CONSTANT.ERROR_MESSAGE.REFRESH_TOKEN,
            CONSTANT.STATUS[403]
          )
        );
      }

      const user = await prisma.user.findFirst({ where: { refreshToken } });

      if (!user) {
        return next(
          createError(
            CONSTANT.ERROR_MESSAGE.REFRESH_TOKEN,
            CONSTANT.STATUS[403]
          )
        );
      }

      const newAccessToken = jwt.signAccessToken(user.id);
      const newRefreshToken = jwt.signRefreshToken();

      const updataUser = await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
        select: {
          id: true,
          email: true,
          avatar: true,
          nickname: true,
          posts: true,
          galleries: true,
        },
      });

      res.cookie("refreshToken", newRefreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.status(200).json({
        accessToken: newAccessToken,
        ...updataUser,
      });
    } catch (error) {
      return next(error);
    }
  } else {
    return res.json(null);
  }
};

const googleOauth = async (req: Request, res: Response, next: NextFunction) => {
  const code = req.query.code as string;
  const pathUrl = (req.query.state as string) || "/";
  const { id_token, access_token } = await oauth.getGoogleToken({ code });
  const googleUser = await oauth.getGoogleUser({
    id_token,
    access_token,
  });

  const existUser = await prisma.user.findUnique({
    where: { email: googleUser.email },
  });

  const refreshToken = jwt.signRefreshToken();

  if (existUser) {
    await prisma.user.update({
      where: { email: googleUser.email },
      data: {
        provider: "GOOGLE",
        refreshToken,
      },
    });
  } else {
    await prisma.user.create({
      data: {
        email: googleUser.email,
        nickname: googleUser.name,
        provider: "GOOGLE",
        refreshToken,
      },
    });
  }
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.redirect(`http://localhost:3000${req.query.state}`);
};

const kakaoOauth = async (req: Request, res: Response, next: NextFunction) => {
  const code = req.query.code as string;
  const grantType = "authorization_code";
  const pathUrl = (req.query.state as string) || "/";
  const data = await oauth.getKakaoToken({ code, grantType });
  if (!data) {
    //error Redirect처리
    return;
  }
  const kakaoUser = await oauth.getKakaoUser({
    access_token: data.access_token,
  });
  const kakaoNickname = kakaoUser.kakao_account.profile.nickname;
  const kakaoId = kakaoUser.id + "";
  const kakaoEmail = kakaoUser.kakao_account.email || undefined;
  const refreshToken = jwt.signRefreshToken();

  if (kakaoEmail) {
    const existUser = await prisma.user.findUnique({
      where: { email: kakaoEmail },
    });
    if (existUser) {
      await prisma.user.update({
        where: { id: existUser.id },
        data: {
          provider: "KAKAO",
          providerId: kakaoId,
          refreshToken,
          nickname: kakaoNickname,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          provider: "KAKAO",
          providerId: kakaoId,
          refreshToken,
          nickname: kakaoNickname,
          email: kakaoEmail,
        },
      });
    }
  } else {
    const existUser = await prisma.user.findFirst({
      where: { providerId: kakaoId },
    });
    if (existUser) {
      await prisma.user.update({
        where: { id: existUser.id },
        data: {
          provider: "KAKAO",
          providerId: kakaoId,
          refreshToken,
          nickname: kakaoNickname,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          provider: "KAKAO",
          providerId: kakaoId,
          refreshToken,
          nickname: kakaoNickname,
          email: kakaoEmail,
        },
      });
    }
  }

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return res.redirect(`http://localhost:3000${req.query.state}`);
};

const postByUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    if (!user) return;
    const postByUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        posts: {
          take: 3,
        },
      },
    });

    return res.status(200).json(postByUser);
  } catch (error) {
    console.log(error);
  }
};
const galleryByUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    if (!user) return;
    const galleryByUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        galleries: {
          take: 3,
        },
      },
    });
    return res.status(200).json(galleryByUser);
  } catch (error) {
    console.log(error);
  }
};

type PostWithLink = Post & { link?: string };
type GalleryWithLink = Gallery & { link?: string };
const likeByUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    if (!user) return;

    const postLikeByUser = await prisma.post.findMany({
      where: {
        likeUsers: {
          has: user.id,
        },
      },
    });
    const linkPosts = postLikeByUser.map((post: PostWithLink) => {
      post.link = `/community/${post.id}`;
      return post;
    });

    const galleryLikeByUser = await prisma.gallery.findMany({
      where: {
        likeUsers: {
          has: user.id,
        },
      },
    });
    const linkGalleries = galleryLikeByUser.map((gallery: GalleryWithLink) => {
      gallery.link = `/gallery/${gallery.id}`;
      return gallery;
    });
    const likeByUserArr = [...linkPosts, ...linkGalleries];

    return res.status(200).json(likeByUserArr);
  } catch (error) {
    console.log(error);
  }
};

const fetchUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    if (!user) return;
    const fetchUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        email: true,
        nickname: true,
        id: true,
        avatar: true,
        posts: true,
        galleries: true,
      },
    });

    return res.status(200).json(fetchUser);
  } catch (error) {
    console.log(error);
  }
};

export default {
  signin,
  signup,
  logout,
  refresh,
  edit,
  googleOauth,
  kakaoOauth,
  postByUser,
  galleryByUser,
  likeByUser,
  fetchUser,
};
