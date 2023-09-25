import express from "express";
import userControllers from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/signin", userControllers.signin);
userRouter.post("/signup", userControllers.signup);
userRouter.post("/refresh", userControllers.refresh);

export default userRouter;
