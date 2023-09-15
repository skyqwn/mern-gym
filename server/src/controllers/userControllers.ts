import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const SALT_ROUND = +process.env.SALT_ROUND!;

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
  } catch (error) {
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

export default { signin, signup };
