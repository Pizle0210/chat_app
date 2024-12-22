import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log(`soft life connected:`, socket.id);

  socket.on("disconnect", (reason) => {
    console.log(`soft life disconnected:`, socket.id, `Reason:`, reason);
    // Add any cleanup or reconnection logic here
  });
});

export { app, server, io };
