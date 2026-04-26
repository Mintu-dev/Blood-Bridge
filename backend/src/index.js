import { app } from "./app.js";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/chat.model.js";
import {User} from "./models/user.model.js";


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
    console.log("📥 GOT MESSAGE:", msg);

    const { sender, receiver, message } = msg;

    // ❌ VALIDATION (VERY IMPORTANT)
    if (!sender || !receiver || !message) {
      console.log("❌ Missing fields:", msg);
      return;
    }

    // 🔥 CHECK USERS EXIST (IMPORTANT DEBUG STEP)
    const senderUser = await User.findById(sender);
    const receiverUser = await User.findById(receiver);

    if (!senderUser || !receiverUser) {
      console.log("❌ User not found");
      console.log("Sender:", senderUser);
      console.log("Receiver:", receiverUser);
      return;
    }

    // 💾 SAVE MESSAGE
    const savedMsg = await Message.create({
      sender,
      receiver,
      message,
    });

    console.log("👉 sender:", sender);
console.log("👉 receiver:", receiver);
console.log("👉 message:", message);

if (!mongoose.Types.ObjectId.isValid(receiver)) {
  console.log("❌ INVALID OBJECT ID FORMAT:", receiver);
  return;
}
    console.log("✅ MESSAGE SAVED:", savedMsg);

    // 🔥 POPULATE
    const populatedMsg = await Message.findById(savedMsg._id)
      .populate("sender", "_id fullname username")
      .populate("receiver", "_id fullname username");

    // 📡 SEND TO RECEIVER
    const receiverSocketId = onlineUsers[receiver];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", populatedMsg);
    }

    // 📡 SEND BACK TO SENDER
    socket.emit("messageSent", populatedMsg);

  } catch (err) {
    console.log("❌ MESSAGE ERROR:", err);
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