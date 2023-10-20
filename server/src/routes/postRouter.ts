import express from "express";
import postController from "../controllers/postController";
import onlyUser from "../util/middleware";

const postRouter = express.Router();

postRouter.post("/", onlyUser, postController.create);
postRouter.get("/", postController.fetch);

export default postRouter;
