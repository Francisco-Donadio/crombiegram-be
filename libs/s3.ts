import { v4 as uuidv4 } from "uuid";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotEnv from "dotenv";
dotEnv.config();

const CLOUD_ACCESS_KEY_ID = process.env.CLOUD_ACCESS_KEY_ID;
const CLOUD_ACCESS_KEY_SECRET = process.env.CLOUD_ACCESS_KEY_SECRET;
export const CLOUD_BUCKET_NAME = process.env.CLOUD_BUCKET_NAME;
const CLOUD_REGION = process.env.CLOUD_REGION;

export const s3Client = new S3Client({
  region: CLOUD_REGION,
  credentials: {
    accessKeyId: CLOUD_ACCESS_KEY_ID as string,
    secretAccessKey: CLOUD_ACCESS_KEY_SECRET as string,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: CLOUD_BUCKET_NAME as string,

    key: function (req, file, cb) {
      cb(null, uuidv4() + "." + file.originalname.split(".")[1]);
    },
  }),
});

export default upload;
