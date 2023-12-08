import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from "./src/routes/userRouter";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import CONSTANT from "./src/constant";
import postRouter from "./src/routes/postRouter";
import galleryRouter from "./src/routes/galleryRouter";
import commentRouter from "./src/routes/commentRouter";
import path from "path";

const app = express();

app.use(cors({ origin: ["http://localhost:3000"], credentials: true })); // 클라이언트랑 cors설정
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/comment", commentRouter);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now(),
  });
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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
