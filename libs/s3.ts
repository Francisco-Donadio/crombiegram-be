import dotEnv from "dotenv";
import { v4 as uuidv4 } from "uuid";
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
  //const stream = fs.createReadStream(fileData.tempFilePath);
  const imageName = uuidv4() + fileData.name;
  console.log({ fileData });

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: imageName,
    Body: fileData.data,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3Cleint.send(command);
  return imageName;
}

export async function getFileURL(filename: any) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await getSignedUrl(s3Cleint, command, { expiresIn: 3600 });
}
