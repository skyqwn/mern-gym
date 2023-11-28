import express from "express";
import onlyUser from "../util/middleware";
import commentController from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.post("/", onlyUser, commentController.create);
commentRouter.get("/gallery/:galleryId", commentController.fetchGalleryComment);
commentRouter.get(
  "/post/:postId",
  onlyUser,
  commentController.fetchPostComment
);
commentRouter.post(
  "/post/:postId/update",
  onlyUser,
  commentController.updatePostComment
);
commentRouter.post("/post/:postId/remove", onlyUser, commentController.remove);

export default commentRouter;
