import express from "express";
import mongoose from "mongoose";
import path from "path";
import "dotenv/config";

import viewsRouter from "./routes/views.js";
import userRouter from "./routes/user.js";
import postsRouter from "./routes/posts.js";

const PORT = 8080;
const mongoURL = process.env.MONGODB_URI || "";

const app = express();

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("DB has been connected...");
  })
  .catch((err) => console.log(err));

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Странички
app.use("/", viewsRouter);

// API
app.use("/api/user", userRouter);
app.use("/api/posts", postsRouter);

app.listen(8080, () => {
  console.log(`Server is running on port: ${PORT}...`);
});
