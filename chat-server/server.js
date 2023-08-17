const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001", // Thay đổi thành URL của client React
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

const connectedUsers = {}; // Để lưu thông tin người dùng và socket của họ

io.on("connection", (socket) => {
  console.log("A user connected");

  // Xác định người dùng và lưu socket của họ
  socket.on("setUser", (userId) => {
    connectedUsers[userId] = socket;
  });

  socket.on("sendMessage", (message) => {
    const receiverSocket = connectedUsers[message.receiverId];
    if (receiverSocket) {
      receiverSocket.to("receiveMessage", message);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Xoá socket của người dùng khi họ ngắt kết nối
    const disconnectedUserId = Object.keys(connectedUsers).find(
      (key) => connectedUsers[key] === socket
    );
    if (disconnectedUserId) {
      delete connectedUsers[disconnectedUserId];
    }
  });
});

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
