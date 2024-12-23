import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectToDb } from "./lib/connect-to-db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { app, server } from "./lib/socket.js";
import path from "path";
dotenv.config();

const port = process.env.PORT || 4009;
const __dirname = path.resolve();
// const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  fileUpload({
    limits: { fieldSize: 5 * 1024 * 1024 }
  })
);

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

//dep...
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`connected to port ${port}`);
  connectToDb();
});
