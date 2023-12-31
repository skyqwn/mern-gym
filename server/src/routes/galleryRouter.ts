import express from "express";
import onlyUser from "../util/middleware";
import galleryController from "../controllers/galleryController";
import multer from "multer";

const galleryRouter = express.Router();

galleryRouter.post(
  "/",
  onlyUser,
  multer().fields([{ name: "files", maxCount: 10 }]),
  galleryController.create
);

galleryRouter.get("/", galleryController.fetch);

galleryRouter.get("/:id", galleryController.detail);

galleryRouter.post(
  "/:id/edit",
  onlyUser,
  multer().fields([{ name: "files", maxCount: 10 }]),
  galleryController.edit
);

galleryRouter.post("/:id/remove", onlyUser, galleryController.remove);

galleryRouter.post("/:id/fav", onlyUser, galleryController.fav);

export default galleryRouter;
