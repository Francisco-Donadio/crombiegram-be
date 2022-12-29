import dotEnv from "dotenv";
dotEnv.config();

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_ACCESS_KEY_SECRET = process.env.AWS_ACCESS_KEY_SECRET;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;

const s3Cleint = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID as string,
    secretAccessKey: AWS_ACCESS_KEY_SECRET as string,
  },
});

export async function uploadFile(fileData: any) {
  const stream = fs.createReadStream(fileData.tempFilePath);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileData.name,
    Body: stream,
  };

  const command = new PutObjectCommand(uploadParams);
  return await s3Cleint.send(command);
}

export async function getFileURL(filename: any) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await getSignedUrl(s3Cleint, command, { expiresIn: 3600 });
}
