import { app } from "./app.js";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/chat.model.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("🟢 New socket:", socket.id);

  // ✅ ADD USER
  socket.on("addUser", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("🟢 Online Users:", onlineUsers);
  });

  // ✅ SEND MESSAGE
socket.on("sendMessage", async (msg) => {
  try {
    const { sender, receiver, message } = msg;

    console.log("📥 GOT:", msg);

    // ❌ STOP BAD ID EARLY
    if (!mongoose.Types.ObjectId.isValid(receiver)) {
      console.log("❌ INVALID RECEIVER ID:", receiver);
      return;
    }

    const receiverUser = await User.findById(receiver);

    if (!receiverUser) {
      console.log("❌ USER NOT FOUND:", receiver);
      return;
    }

    const newMsg = await Message.create({
      sender,
      receiver,
      message,
    });

    const populatedMsg = await Message.findById(newMsg._id)
      .populate("sender receiver");

    const socketId = onlineUsers[receiver];

    if (socketId) {
      io.to(socketId).emit("receiveMessage", populatedMsg);
    }

    socket.emit("messageSent", populatedMsg);

  } catch (err) {
    console.log("❌ ERROR:", err.message);
  }
});

  // ✅ DISCONNECT
  socket.on("disconnect", () => {
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }
    console.log("🔴 User disconnected:", socket.id);
  });
});

(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("DB connected");

    server.listen(PORT, () => {
      console.log("Server running on", PORT);
    });
  } catch (err) {
    console.log(err);
  }
})();