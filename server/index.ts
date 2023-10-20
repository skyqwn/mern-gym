import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from "./src/routes/userRouter";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import jwt from "./src/libs/jwt";
import createError from "./src/util/createError";
import CONSTANT from "./src/constant";
import postRouter from "./src/routes/postRouter";

const app = express();
const prisma = new PrismaClient();

app.get("/welcome", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome!");
});

app.use(cors({ origin: ["http://localhost:3000"], credentials: true })); // 클라이언트랑 cors설정
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api/test",
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "인증헤더가 없음" });
    }

    try {
      const token = req.headers.authorization.split(" ")[1]; //access token

      if (!token) return res.status(401).json({ message: "인증토큰이 없음" });

      const id = jwt.verifyAccessToken(token);

      if (!id)
        return res.status(403).json({ message: "no verified access token" });

      const prisma = new PrismaClient();

      const user = await prisma.user.findUnique({ where: { id } });
      console.log(user);

      if (!user) {
        return res.status(403).json({ message: "no exists user" });
      }

      //@ts-ignore
      req.user = user;

      next();
    } catch (error: any) {
      return res.status(500).json({ message: "서버 오류" });
    }
  },
  (req: Request, res: Response) => {
    //@ts-ignore
    res.status(200).json(req.user);
  }
);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen("8000", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8000
  ################################################
`);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const message = err.message || CONSTANT.ERROR_MESSAGE.SERVER;
  const status = err.status || CONSTANT.STATUS[500];
  return res.status(status).json({ message });
});
