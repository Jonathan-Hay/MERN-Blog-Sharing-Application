import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import bloPostRouter from './routes/post-routes.js';
import userRouter from './routes/user-routes.js';

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());



app.use("/user", userRouter);
app.use("/post", bloPostRouter);


mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/BlogApplication"
  )
  .then(() => app.listen(PORT))
  .then(() =>
    console.log("connected to database, listening on 5000")
  )
  .catch((err) => console.log(err));