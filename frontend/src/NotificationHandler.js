import { useEffect, useState } from "react";
import socket from "./socket";
const BASE_URL = process.env.REACT_APP_BACKEND;

function NotificationHandler() {
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/profile`, {
          credentials: "include"
        });
        const data = await res.json();
        if (data.user?._id) {
          setMyId(data.user._id);
          console.log("🔔 MY ID SET:", data.user._id);
          socket.emit("addUser", data.user._id);
        }
      } catch (err) {
        console.log("❌ Error:", err);
      }
    };

    getMyProfile();
  }, []);

  useEffect(() => {
    if (!myId) return;

    const handleNewMessage = (msg) => {
      console.log("📩 Message received:", msg);
      console.log("🔍 My ID:", myId);
      
      //  Get receiver ID properly
      let receiverId = msg.receiver;
      if (typeof receiverId === 'object' && receiverId !== null) {
        receiverId = receiverId._id;
      }
      
      let senderId = msg.sender;
      if (typeof senderId === 'object' && senderId !== null) {
        senderId = senderId._id;
      }
      
      console.log("🔍 Receiver ID from message:", receiverId);
      console.log("🔍 Match?", receiverId === myId);
      
      //  Check if message is for current user
      if (String(receiverId) === String(myId)) {
        console.log("Message is for ME!");
        
        // Get current unread counts
        let currentUnread = {};
        try {
          const stored = localStorage.getItem('unreadCounts');
          if (stored) currentUnread = JSON.parse(stored);
        } catch (e) {}
        
        // Increment for sender
        currentUnread[senderId] = (currentUnread[senderId] || 0) + 1;
        localStorage.setItem('unreadCounts', JSON.stringify(currentUnread));
        
        console.log("💾 Updated counts:", currentUnread);
        
        // Force UI update
        window.dispatchEvent(new Event('storage'));
      }
    };

    socket.on("receiveMessage", handleNewMessage);
    return () => socket.off("receiveMessage", handleNewMessage);
  }, [myId]);

  return null;
}

export default NotificationHandler;