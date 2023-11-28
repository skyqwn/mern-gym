import express from "express";
import onlyUser from "../util/middleware";
import commentController from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.post("/post", onlyUser, commentController.create);
commentRouter.post("/gallery", onlyUser, commentController.create);
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
commentRouter.get(
  "/gallery/:galleryId",
  onlyUser,
  commentController.fetchGalleryComment
);
commentRouter.post(
  "/gallery/:galleryId/update",
  onlyUser,
  commentController.updateGalleryComment
);
commentRouter.post("/post/:postId/remove", onlyUser, commentController.remove);

export default commentRouter;
