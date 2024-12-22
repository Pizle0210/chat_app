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

export function getRecieverSocket(userId) {
    return userSocketMap[userId]
}

// online users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log(`A USER CONNECTED:`, socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  //   sends events to connected clients
  io.emit(`getOnlineUsers`, Object.keys(userSocketMap));

  socket.on("disconnect", (reason) => {
    console.log(`USER DISCONNECTED:`, socket.id, `Reason:`, reason);

    delete userSocketMap[userId];
    io.emit(`getOnlineUsers`, Object.keys(userSocketMap));
  });
});

export { app, server, io };
