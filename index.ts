import express from "express";

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Crombiegram");
});

app.listen(3000, () => {
  return console.log(`Server running on 3000`);
});
