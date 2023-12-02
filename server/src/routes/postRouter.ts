import express from "express";
import postController from "../controllers/postController";
import onlyUser from "../util/middleware";

const postRouter = express.Router();

postRouter.post("/", onlyUser, postController.create);
postRouter.get("/", postController.fetch);
postRouter.get("/:id", postController.detail);
postRouter.post("/:id/edit", onlyUser, postController.edit);
postRouter.post("/:id/remove", onlyUser, postController.remove);
postRouter.post("/:id/fav", onlyUser, postController.fav);
postRouter.get("/:id/userByPost", onlyUser, postController.userByPost);

export default postRouter;
