import s3Config from "./s3Config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { buffer } from "stream/consumers";
import sharpResize from "./sharpResize";
dotenv.config();

interface PutImageParams {
  folderName: string;
  file: Express.Multer.File;
  type: "GALLERY" | "USER";
  resizeWidth?: number;
}

export default async ({
  folderName,
  file,
  type,
  resizeWidth,
}: PutImageParams) => {
  let bufferData = file.buffer;

  try {
    if (resizeWidth) {
      bufferData = await sharpResize(bufferData, resizeWidth);
    }

    const input = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${type}/${folderName}/${file.originalname}`,
      Body: bufferData,
    };
    await s3Config.send(new PutObjectCommand(input));

    const s3Domain = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com`;

    return `${s3Domain}/${input.Key}`;
  } catch (error) {
    throw Error("upload fail");
  }
};
