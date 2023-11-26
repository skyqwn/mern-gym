import express from "express";
import onlyUser from "../util/middleware";
import commentController from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.post("/", onlyUser, commentController.create);
commentRouter.get("/:postId", onlyUser, commentController.fetch);

export default commentRouter;
