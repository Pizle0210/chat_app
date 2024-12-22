import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectToDb } from "./lib/connect-to-db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
dotenv.config();

const port = process.env.PORT || 4008;
const app = express();
app.use(express.json({limit:'5mb'}));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  fileUpload({
    limits: { fieldSize: 5 * 1024 * 1024 }
  })
);
app.use((req, res, next) => {
  console.log(`Incoming request size: ${req.headers["content-length"]} bytes`);
  next();
});

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(port, () => {
  console.log(`connected to port ${port}`);
  connectToDb();
});
