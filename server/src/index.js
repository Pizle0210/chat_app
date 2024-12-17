import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectToDb } from "./lib/connect-to-db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 4008;
const app = express();
app.use(express.json());
app.use(cookieParser());

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.listen(port, () => {
  console.log(`connected to port ${port}`);
  connectToDb();
});
