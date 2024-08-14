import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./models/connectDB.js";
import authRoute from "./routes/auth.route.js";
const app = express();

dotenv.config();

connectDB()

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", authRoute)

app.listen(5000, () => {
  console.log("Backend sever is running !");
});
