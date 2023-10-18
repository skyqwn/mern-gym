import express from "express";
import userControllers from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/signin", userControllers.signin);

userRouter.post("/signup", userControllers.signup);

userRouter.post("/refresh", userControllers.refresh);

userRouter.get("/oauth/google", userControllers.googleOauth);

userRouter.get("/oauth/kakao/callback", userControllers.kakaoOauth);

export default userRouter;
