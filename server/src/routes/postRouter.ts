import express from "express";
import postController from "../controllers/postController";

const postRouter = express.Router();

postRouter.post("/", postController.create);

export default postRouter;
