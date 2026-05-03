import { useEffect, useState } from "react";
import socket from "./socket";
const BASE_URL = process.env.REACT_APP_BACKEND;

function NotificationHandler() {
  const [myId, setMyId] = useState(null);

  // ✅ Get My ID from API
  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/profile`, {
          credentials: "include"
        });
        const data = await res.json();
        if (data.user?._id) {
          setMyId(data.user._id);
          console.log("🔔 Notification Handler - MY ID:", data.user._id);
        }
      } catch (err) {
        console.log("❌ Notification handler profile error:", err);
      }
    };

    getMyProfile();
  }, []);

  // ✅ Listen for messages ONLY after myId is available
  useEffect(() => {
    if (!myId) return; // Wait until we have myId

    const handleNewMessage = (msg) => {
      console.log("📩 NOTIFICATION HANDLER RECEIVED:", msg);

      const receiverId = msg.receiver?._id || msg.receiver;
      const senderId = msg.sender?._id || msg.sender;

      // ✅ Only count if I'm the receiver
      if (String(receiverId) === String(myId)) {
        console.log("✅ Message is for ME, updating localStorage");

        // Get current unread counts
        const currentUnread = JSON.parse(
          localStorage.getItem('unreadCounts') || '{}'
        );

        // Increment unread for this sender
        currentUnread[senderId] = (currentUnread[senderId] || 0) + 1;

        // Save back to localStorage
        localStorage.setItem('unreadCounts', JSON.stringify(currentUnread));

        console.log("💾 LOCALSTORAGE UPDATED:", currentUnread);
      }
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [myId]); // Re-run when myId changes

  return null;
}

export default NotificationHandler;