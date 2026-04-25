import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";
import { useNavigate } from "react-router-dom";

function ChatList() {
  const [chats, setChats] = useState([]);
  const [myId, setMyId] = useState("");
  const navigate = useNavigate();

  // 🟢 GET USER
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/profile",
        { withCredentials: true }
      );

      const id = res.data.user._id;
      setMyId(id);

      socket.emit("addUser", id);
      console.log("👤 MY ID:", id);
    };

    getUser();
  }, []);

  // 🟢 LOAD CHATS
  useEffect(() => {
    const fetchChats = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/allchat",
        { withCredentials: true }
      );

      setChats(res.data || []);
    };

    fetchChats();
  }, []);

  // 🟢 REALTIME UPDATE (FIXED)
  useEffect(() => {
    if (!myId) return;

    const handler = (msg) => {
      console.log("📩 NEW MSG:", msg);

      const senderId = msg.sender?._id || msg.sender;
      const receiverId = msg.receiver?._id || msg.receiver;

      const otherUserId =
        String(senderId) === String(myId) ? receiverId : senderId;

      const otherUser =
        String(senderId) === String(myId) ? msg.receiver : msg.sender;

      if (!otherUserId) return;

      setChats((prev) => {
        const exists = prev.find(
          (c) => String(c._id) === String(otherUserId)
        );

        if (exists) {
          return prev.map((c) =>
            String(c._id) === String(otherUserId)
              ? { ...c, lastMessage: msg.message }
              : c
          );
        }

        return [
          {
            _id: otherUserId,
            fullname: otherUser?.fullname || "User",
            username: otherUser?.username || "",
            lastMessage: msg.message,
          },
          ...prev,
        ];
      });
    };

    socket.on("receiveMessage", handler);

    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [myId]);

const openChat = (user) => {
  console.log("OPEN CHAT USER:", user);

  const id = user.user?._id || user._id;

  if (!id) {
    console.log("❌ INVALID USER ID");
    return;
  }

  navigate(`/chat/${id}`);
};

  console.log("CHATS:", chats);

  return (
    <div>
      <h1>ChatList</h1>

      {chats.length === 0 && <p>No chats yet</p>}

      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => openChat(chat)}
          style={{ cursor: "pointer", padding: "10px" }}
        >
          <b>{chat.fullname}</b>
          <div>{chat.lastMessage}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;