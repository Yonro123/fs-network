import express from "express";
import mongoose from "mongoose";
import path from "path";

const PORT = 8080;
const mongoURL =
  "mongodb+srv://yonro:24081999Yonro@yonro.lab1pb4.mongodb.net/newsApp?retryWrites=true&w=majority";

const app = express();

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("DB has been connected...");
  })
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.log(`Server is running on port: ${PORT}...`);
});
