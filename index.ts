import express, { NextFunction, RequestHandler } from "express";
import cors from "cors";
import appRouter from "./routes";
import { sequelize } from "./models";
import fileUpload from "express-fileupload";
import { getFileURL, uploadFile } from "./libs/s3";

const app = express();

app.use(express.json());
app.use(cors());
//app.use(fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }));
app.use(fileUpload());

app.post("/files", async (req, res) => {
  const result = await uploadFile(req.files!.file);
  return res.send({ result });
});

app.get("/files/:fileName", async (req, res) => {
  const result = await getFileURL(req.params.fileName);
  res.json({
    url: result,
  });
});

app.get("/test", (req, res) => {
  return res.json("test");
});

app.post("/sync", async (req, res) => {
  sequelize
    .authenticate()
    .then(async () => {
      console.log("database connected");

      try {
        await sequelize.sync({ force: true });
        return res.status(200).json({ message: "sync complete" });
      } catch (error: any) {
        console.log(error.message);
      }
    })
    .catch((e: any) => {
      console.log(e.message);
    });
});

app.use("/api", appRouter);

// app.use(express.static("images"));

app.listen(3000, () => {
  return console.log(`Server running on 3000`);
});
