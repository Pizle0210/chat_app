import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import { connectToDb } from "./lib/connect-to-db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT || 4008;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`connected to port ${port}`);
  connectToDb();
});
