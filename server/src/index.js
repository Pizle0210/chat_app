import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import router from "./routes/auth.route.js";
import { signin, signout, signup } from "./controllers/auth.controller.js";
import { connectToDb } from "./lib/connect-to-db.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use("/api/auth", authRoute);

// authentication
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

app.listen(port, () => {
  console.log(`connected to port ${port}`);
  connectToDb();
});
