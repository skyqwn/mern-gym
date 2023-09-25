import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from "./src/routes/userRouter";
import cookieParser from "cookie-parser";

const app = express();

app.get("/welcome", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome!");
});

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/test", (req: Request, res: Response) => {
  console.log(req.headers);
});
app.use("/api/user", userRouter);

app.listen("8000", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8000
  ################################################
`);
});
