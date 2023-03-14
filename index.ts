import express from "express";
import cors from "cors";
import appRouter from "./routes";
import { sequelize } from "./models";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Hola mundo");
});
//
//SYNC
//

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

app.listen(3000, () => {
  return console.log(`Server running on 3000`);
});
