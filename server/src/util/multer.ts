import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";

dotenv.config();

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
});
export const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME as string,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});
