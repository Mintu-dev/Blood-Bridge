import { useEffect } from "react";
import socket from "./socket";
const BASE_URL = process.env.REACT_APP_BACKEND;

function NotificationHandler() {
  useEffect(() => {
    let myId = null;

    // ✅ Get My ID from API
    const getMyProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/profile`, {
          credentials: "include"
        });
        const data = await res.json();
        myId = data.user?._id;
        console.log("🔔 Notification Handler - MY ID:", myId);
      } catch (err) {
        console.log("❌ Notification handler profile error:", err);
      }
    };

    getMyProfile();

    // ✅ ALWAYS LISTEN for incoming messages
    const handleNewMessage = (msg) => {
      console.log("📩 NOTIFICATION HANDLER RECEIVED:", msg);

      const receiverId = msg.receiver?._id || msg.receiver;
      const senderId = msg.sender?._id || msg.sender;

      // ✅ Only count if I'm the receiver
      if (myId && String(receiverId) === String(myId)) {
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
  }, []);

  return null; // This component doesn't render anything
}

export default NotificationHandler;