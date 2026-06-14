import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";
import { useParams } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BACKEND;

function Chat() {
  const { userId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [myId, setMyId] = useState("");

  // SOCKET CONNECT
  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 CONNECTED:", socket.id);
    });

    return () => socket.off("connect");
  }, []);

  // GET USER
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/profile`, {
          withCredentials: true,
        });

        const id = res.data.user._id;
        setMyId(id);

        if (socket.connected) {
          socket.emit("addUser", id);
          console.log("👤 MY ID (socket connected):", id);
        } else {
          socket.on("connect", () => {
            socket.emit("addUser", id);
            console.log("👤 MY ID (on connect):", id);
          });
        }
      } catch (err) {
        console.log("❌ Profile error:", err);
      }
    };

    getUser();
  }, []);

  // LOAD MESSAGES
  useEffect(() => {
    if (!userId) return;

    const fetchMessages = async () => {
      const res = await axios.get(`${BASE_URL}/api/user/getmsg/${userId}`, {
        withCredentials: true,
      });

      console.log("📦 OLD MESSAGES:", res.data);
      setMessages(res.data || []);
    };

    fetchMessages();
  }, [userId]);

  // REALTIME
  useEffect(() => {
    const handler = (msg) => {
      console.log("📩 RECEIVED MSG:", msg);

      const senderId = msg.sender?._id || msg.sender;
      const receiverId = msg.receiver?._id || msg.receiver;
      if (!myId || !userId) return;
      console.log("👉 senderId:", senderId);
      console.log("👉 receiverId:", receiverId);
      console.log("👉 MY ID:", myId);
      console.log("👉 CHAT WITH:", userId);

      const isValid =
        (String(senderId) === String(myId) &&
          String(receiverId) === String(userId)) ||
        (String(senderId) === String(userId) &&
          String(receiverId) === String(myId));

      console.log(" isValid:", isValid);

      if (isValid) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handler);
    return () => socket.off("receiveMessage", handler);
  }, [myId, userId]);

  // SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim() || !myId || !userId) {
      console.log("❌ BLOCKED SEND:", { myId, userId, text });
      return;
    }

    if (myId === userId) {
      console.log("❌ SENDING TO SELF BLOCKED");
      return;
    }
    if (!myId || !userId) return;
    const msg = {
      sender: myId,
      receiver: userId,
      message: text,
    };

    console.log("📤 SENDING MSG:", msg);

    socket.emit("sendMessage", msg);

    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  console.log("👤 MY ID:", myId);
  console.log("💬 CHAT WITH (URL):", userId);


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 80px)",
        maxWidth: "700px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 0",
          borderBottom: "1px solid #eee",
          fontWeight: "700",
          fontSize: "18px",
          color: "#c62828",
        }}
      >
        💬 Chat
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {messages.map((msg, i) => {
          const senderId = msg.sender?._id || msg.sender;
          const isMe = String(senderId) === String(myId);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
              }}
            >
              <span
                style={{
                  background: isMe
                    ? "linear-gradient(90deg,#c62828,#ff5252)"
                    : "#f0f0f0",
                  color: isMe ? "white" : "black",
                  padding: "10px 16px",
                  borderRadius: isMe
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
                  maxWidth: "70%",
                  fontSize: "14px",
                  lineHeight: "1.4",
                }}
              >
                {msg.message}
              </span>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "12px 0",
          borderTop: "1px solid #eee",
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "25px",
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: "linear-gradient(90deg,#c62828,#ff5252)",
            color: "white",
            border: "none",
            borderRadius: "25px",
            padding: "12px 24px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
