import { app } from "./app.js";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/chat.model.js";
import { User } from "./models/user.model.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

//  ALLOWED ORIGINS
const allowedOrigins = [
  "http://localhost:3000",
  "https://lifeconnect-frontend.onrender.com",  //  Apna frontend URL dalna
  process.env.FRONTEND_URL,
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Socket blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
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

      // ❌ VALIDATION
      if (!sender || !receiver || !message) {
        console.log("❌ Missing fields:", msg);
        return;
      }

      // 🔥 CHECK USERS EXIST
      const senderUser = await User.findById(sender);
      const receiverUser = await User.findById(receiver);

      if (!senderUser || !receiverUser) {
        console.log("❌ User not found");
        console.log("Sender:", senderUser);
        console.log("Receiver:", receiverUser);
        return;
      }

      //  SAVE MESSAGE
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

      //  POPULATE
      const populatedMsg = await Message.findById(savedMsg._id)
        .populate("sender", "_id fullname username")
        .populate("receiver", "_id fullname username");

      //  SEND TO RECEIVER
      const receiverSocketId = onlineUsers[receiver];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", populatedMsg);
      }

      //  SEND BACK TO SENDER
      socket.emit("messageSent", populatedMsg);

    } catch (err) {
      console.log("❌ MESSAGE ERROR:", err);
    }
  });

  //  DISCONNECT
  socket.on("disconnect", () => {
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅DATABASE CONNECTION
(async () => {
  try {
    if (!process.env.DB_CONNECTION) {
      console.log("❌ DB_CONNECTION environment variable not found!");
      process.exit(1);
    }

    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("✅ DB connected successfully");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log("❌ Failed to start server:", err);
    process.exit(1);
  }
})();