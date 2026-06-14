import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BACKEND;

function ChatList() {
  const [chats, setChats] = useState([]);
  const [myId, setMyId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  // LOAD CHATS
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/allchat`, {
          withCredentials: true,
        });

        console.log("📦 ALL CHAT API RESPONSE:", res.data);

        const chatsWithUnread = (res.data || []).map((chat) => ({
          ...chat,
          unread: 0,
        }));

        const savedUnread = JSON.parse(
          localStorage.getItem("unreadCounts") || "{}",
        );
        const finalChats = chatsWithUnread.map((chat) => ({
          ...chat,
          unread: savedUnread[chat._id] || 0,
        }));

        setChats(finalChats);
      } catch (err) {
        console.log("❌ Chats error:", err);
      }
    };

    fetchChats();
  }, []);

  // FUNCTION TO UPDATE LOCALSTORAGE & NOTIFY NAVBAR
  const updateUnreadStorage = (chatsArray) => {
    const unreadCounts = {};
    chatsArray.forEach((c) => {
      const cId = c.user?._id || c._id;
      if (cId) {
        unreadCounts[cId] = c.unread || 0;
      }
    });
    localStorage.setItem("unreadCounts", JSON.stringify(unreadCounts));
    console.log("💾 SAVED TO LOCALSTORAGE:", unreadCounts);
  };

  // REALTIME
  useEffect(() => {
    if (!myId) return;

    const handler = (msg) => {
      console.log("📩 REALTIME MSG:", msg);

      const senderId = msg.sender?._id || msg.sender;
      const receiverId = msg.receiver?._id || msg.receiver;

      const otherUserId =
        String(senderId) === String(myId) ? receiverId : senderId;

      const otherUser =
        String(senderId) === String(myId) ? msg.receiver : msg.sender;

      if (!otherUserId) return;

      const currentPath = window.location.pathname;
      const isChatOpen = currentPath.includes(`/chat/${otherUserId}`);

      setChats((prev) => {
        // Check if chat already exists
        const chatExists = prev.find(
          (c) => String(c.user?._id || c._id) === String(otherUserId),
        );

        let updated;
        if (chatExists) {
          updated = prev.map((c) => {
            const cId = c.user?._id || c._id;
            if (String(cId) === String(otherUserId)) {
              return {
                ...c,
                lastMessage: msg.message,
                unread: isChatOpen ? 0 : (c.unread || 0) + 1,
              };
            }
            return c;
          });
        } else {
          // New chat entry
          updated = [
            {
              _id: otherUserId,
              user: otherUser,
              fullname: otherUser?.fullname || "User",
              lastMessage: msg.message,
              unread: 1,
            },
            ...prev,
          ];
        }

        //  UPDATE LOCALSTORAGE
        updateUnreadStorage(updated);
        return updated;
      });
    };

    socket.on("receiveMessage", handler);
    return () => socket.off("receiveMessage", handler);
  }, [myId]);

  const openChat = (chat) => {
    let otherId = chat.user?._id || chat._id;
    if (!otherId || String(otherId) === String(myId)) return;

    //  Reset unread for this chat
    setChats((prev) => {
      const updated = prev.map((c) => {
        const cId = c.user?._id || c._id;
        if (String(cId) === String(otherId)) {
          return { ...c, unread: 0 };
        }
        return c;
      });

      //  UPDATE LOCALSTORAGE
      updateUnreadStorage(updated);
      return updated;
    });

    navigate(`/chat/${otherId}`);
  };

  //  Filter chats by search
  const filteredChats = chats.filter((chat) => {
    const name = (chat.fullname || chat.user?.fullname || "").toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  //  Get time from timestamp
  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "0 auto",
        height: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 40px rgba(0,0,0,0.1)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #FAD 0%, #b71c1c 100%)",
          color: "white",
          padding: "20px",
          borderTopLeftRadius: "30px",
          borderTopRightRadius:"30px",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          boxShadow: "0 10px 30px rgba(211, 47, 47, 0.3)",
          position: "relative",
        }}
      >
        <button
          onClick={() => navigate("/explore", { state: { openMenu: true } })}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
            fontSize: "20px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        <h2
          style={{
            margin: 0,
            marginLeft: "60px",
            fontWeight: "700",
            fontSize: "25px",
            letterSpacing: "0.5px",
          }}
        >
          💬 Messages
        </h2>
        <p
          style={{
            margin: "5px 0 0",
            opacity: 0.8,
            fontSize: "14px",
            marginLeft: "80px",
          }}
        >
          {filteredChats.length} conversation
          {filteredChats.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* SEARCH BAR */}
      <div style={{ padding: "15px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f5f5f5",
            borderRadius: "25px",
            padding: "10px 20px",
            border: "2px solid transparent",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#d32f2f")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
        >
          <span style={{ marginRight: "10px", fontSize: "18px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              width: "100%",
              fontSize: "15px",
              color: "#333",
            }}
          />
        </div>
      </div>

      {/* CHAT LIST */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 15px",
        }}
      >
        {filteredChats.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#999",
            }}
          >
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>💭</div>
            <h3 style={{ color: "#666", marginBottom: "10px" }}>
              No Messages Yet
            </h3>
            <p style={{ fontSize: "14px" }}>
              Start a conversation with a donor!
            </p>
          </div>
        ) : (
          filteredChats.map((chat, i) => {
            const initials = (chat.fullname || chat.user?.fullname || "U")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={i}
                onClick={() => openChat(chat)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  margin: "8px 0",
                  borderRadius: "15px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: chat.unread > 0 ? "#fff5f5" : "transparent",
                  boxShadow:
                    chat.unread > 0 ? "0 2px 10px rgba(211,47,47,0.1)" : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9f9f9";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    chat.unread > 0 ? "#fff5f5" : "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {/* AVATAR */}
                <div
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "15px",
                    background: `linear-gradient(135deg, ${["#d32f2f", "#e91e63", "#9c27b0", "#ff5722"][i % 4]}, ${["#b71c1c", "#c2185b", "#7b1fa2", "#e64a19"][i % 4]})`,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginRight: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>

                {/* CHAT INFO */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: chat.unread > 0 ? "700" : "600",
                        fontSize: "16px",
                        color: "#333",
                      }}
                    >
                      {chat.fullname || chat.user?.fullname}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#999",
                        fontWeight: chat.unread > 0 ? "600" : "400",
                      }}
                    >
                      {getTime()}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: chat.unread > 0 ? "#333" : "#888",
                        fontSize: "14px",
                        fontWeight: chat.unread > 0 ? "600" : "400",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "220px",
                      }}
                    >
                      {chat.lastMessage || "No messages yet"}
                    </span>

                    {/* UNREAD BADGE */}
                    {chat.unread > 0 && (
                      <span
                        style={{
                          background:
                            "linear-gradient(135deg, #d32f2f, #b71c1c)",
                          color: "white",
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          boxShadow: "0 3px 10px rgba(211,47,47,0.3)",
                          flexShrink: 0,
                        }}
                      >
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ChatList;
