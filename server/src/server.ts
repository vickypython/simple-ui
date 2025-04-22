require("dotenv").config()
import express, {Express} from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
import SimpleuiRoute from "./routes/router";
const app:Express= express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(SimpleuiRoute);
const MONGO_URL: string =
  `mongodb+srv://vickymlucky:${process.env.MONGODB_PASSWORD}@cluster0.xaqfsym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("connected", () => console.log("we are in cats"));
app.listen(6000, () => {
  console.log(`server running on localhost:${process.env.PORT}`);
});
