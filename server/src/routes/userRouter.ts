import express from "express";
import userControllers from "../controllers/userControllers";
import onlyUser from "../util/middleware";
import multer from "multer";

const userRouter = express.Router();

userRouter.post("/signin", userControllers.signin);

userRouter.post("/signup", userControllers.signup);
userRouter.post("/logout", userControllers.logout);

userRouter.put(
  "/:id",
  onlyUser,
  multer().fields([{ name: "file" }]),
  userControllers.edit
);

userRouter.post("/refresh", userControllers.refresh);

userRouter.get("/fetchUser", onlyUser, userControllers.fetchUser);

userRouter.get("/postByUser", onlyUser, userControllers.postByUser);

userRouter.get("/galleryByUser", onlyUser, userControllers.galleryByUser);

userRouter.get("/likeByUser", onlyUser, userControllers.likeByUser);

userRouter.get("/oauth/google", userControllers.googleOauth);

userRouter.get("/oauth/kakao/callback", userControllers.kakaoOauth);

export default userRouter;
