import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";
import { useParams } from "react-router-dom";

function Chat() {
  const { userId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [myId, setMyId] = useState("");

  // 🟢 SOCKET CONNECT
  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 CONNECTED:", socket.id);
    });

    return () => socket.off("connect");
  }, []);

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
      console.log("👤 REGISTERED:", id);
    };

    getUser();
  }, []);

  // 🟢 LOAD MESSAGES
  useEffect(() => {
    if (!userId) return;

    const fetchMessages = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/getmsg/${userId}`,
        { withCredentials: true }
      );

      setMessages(res.data || []);
    };

    fetchMessages();
  }, [userId]);

  // 🟢 REALTIME FIXED
  useEffect(() => {
    const handler = (msg) => {
      if (!msg) return;

      const senderId = msg.sender?._id || msg.sender;
      const receiverId = msg.receiver?._id || msg.receiver;

      const isValid =
        (String(senderId) === String(myId) &&
          String(receiverId) === String(userId)) ||
        (String(senderId) === String(userId) &&
          String(receiverId) === String(myId));

      if (isValid) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handler);

    return () => socket.off("receiveMessage", handler);
  }, [myId, userId]);

  // 🟢 SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim() || !myId || !userId) return;

    const msg = {
      sender: myId,
      receiver: userId,
      message: text,
    };

    console.log("📤 SENDING:", msg);

    socket.emit("sendMessage", msg);

    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  console.log("CHAT OPEN WITH:", userId);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Chat</h3>

      <div style={{ minHeight: "300px" }}>
        {messages.map((msg, i) => {
          const senderId = msg.sender?._id || msg.sender;

          return (
            <div
              key={i}
              style={{
                textAlign:
                  String(senderId) === String(myId) ? "right" : "left",
                margin: "5px",
              }}
            >
              <span
                style={{
                  background:
                    String(senderId) === String(myId)
                      ? "#d32f2f"
                      : "#eee",
                  color:
                    String(senderId) === String(myId)
                      ? "white"
                      : "black",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  display: "inline-block",
                }}
              >
                {msg.message}
              </span>
            </div>
          );
        })}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;