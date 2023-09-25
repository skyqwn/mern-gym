import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

const prisma = new PrismaClient();

const SALT_ROUND = +process.env.SALT_ROUND!;

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { email, password },
    } = req;
    if (!email || !password) {
      return res.status(500).json({ message: " 빈칸을 다 채워주세요" });
    }
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(500)
        .json({ message: "이메일과 비밀번호를 확인하세요" });
    }

    const checkedPassword = bcrypt.compareSync(password, user.password);

    if (!checkedPassword) {
      return res
        .status(500)
        .json({ message: "이메일과 비밀번호를 확인하세요" });
    }

    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      userEmail: user.email,
      userNickname: user.nickname,
      refreshToken,
      accessToken,
    });
  } catch (error) {
    console.log(error);
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
      return res.status(500).json({ message: "빈칸 다 채워주세요" });
    }

    if (password !== verifyPassword) {
      return res.status(500).json({ message: "비밀번호를 같게 입력해주세요" });
    }

    const hashedPw = bcrypt.hashSync(password, SALT_ROUND);

    const newUser = await prisma.user.create({
      data: { email, nickname, password: hashedPw },
    });
    console.log(newUser);
    return res.status(200).json({ newUser });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.refreshToken) {
    const {
      cookies: { refreshToken },
    } = req;
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
      id: string;
      lat: number;
      lng: number;
    };
    if (!decoded) {
      res.status(500).json({ message: "인증안된 토큰입니다." });
    }
    const userId = decoded.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(500).json({ message: "인증안된 토큰입니다." });
    }
    const newAccessToken = jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET);
    res.status(200).json({
      accessToken: newAccessToken,
      userEmail: user.email,
      userNickname: user.nickname,
    });
  } else {
    res.status(500).json(null);
  }
};

export default { signin, signup, refresh };
