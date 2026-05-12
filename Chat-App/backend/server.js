const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

io.on("connection", (socket) => {
  
  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("send_message", async (data) => {

    const msg = await Message.create({
      ...data,
      seen: false,
    });

    io.to(data.room).emit("receive_message", msg);
  });

   // 👁️ MESSAGE SEEN EVENT
  socket.on("message_seen", async ({ messageId, room }) => {

    const updated = await Message.findByIdAndUpdate(
      messageId,
      { seen: true },
      { new: true }
    );

    io.to(room).emit("message_seen_update", updated);
  });

});
server.listen(5000, () => {
  console.log("Server Running");
});