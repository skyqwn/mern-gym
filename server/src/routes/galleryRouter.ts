import express from "express";
import onlyUser from "../util/middleware";
import galleryController from "../controllers/galleryController";
import { upload } from "../util/multer";

const galleryRouter = express.Router();

galleryRouter.post(
  "/",
  onlyUser,
  upload.single("file"),
  galleryController.create
);

galleryRouter.get("/", galleryController.fetch);
galleryRouter.get("/:id", galleryController.detail);

export default galleryRouter;
