import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Profile from "./Profile";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Establish socket connection
const socket = io("http://localhost:3000");

export default function ChatContainer({ community, isOpen, onClose }) {
  const [chatInput, setChatInput] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const userId = localStorage.getItem("user_id");
  const ngoId = localStorage.getItem("ngo_id");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Function to fetch messages from the server (polling)
  const fetchMessages = () => {
    if (isOpen && community?._id) {
      fetch(`http://localhost:3000/messages/conversation/${community._id}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setChatMessages(data);
            console.log("first" + JSON.stringify(data));
          } else {
            console.error("Expected an array of messages but got:", data);
            setChatMessages([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  };

  useEffect(() => {
    if (isOpen && community?._id) {
      // 1. Fetch initial messages
      fetchMessages();

      // 2. Socket.IO listener for real-time messages
      socket.on("chatMessage", (msg) => {
        console.log("Received message:", msg);
      });

      // 3. Polling mechanism as a fallback (every 10 seconds)
      const pollingInterval = setInterval(fetchMessages, 10000);

      // Cleanup on component unmount
      return () => {
        clearInterval(pollingInterval);
        socket.off("chatMessage"); // Remove Socket.IO listener
      };
    }
  }, [isOpen, community?._id]);

  const handleSend = () => {
    if (chatInput.trim()) {
      const newMessage = {
        sender: userId ? userId : ngoId,
        receiver: community._id,
        text: chatInput,
      };

      console.log(newMessage);

      // Emit new message through socket
      socket.emit("chatMessage", newMessage);

      // Add message to the chat locally
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);

      // Send message to the server (for persistence)
      fetch("http://localhost:3000/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: userId ? userId : ngoId,
          receiver: community._id,
          text: chatInput,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          setChatInput("");
        })
        .catch((error) => {});
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleEscKey = (e) => {
    if (e.key === "Escape" && !isProfileOpen) {
      onClose(); // Close chat container on ESC for large screens
    }
  };

  useEffect(() => {
    // Add ESC key listener for large screens
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  if (!isOpen || !community || !community._id) return null;

  const styles = {
    chatContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      overflowY: "auto",
    },
    input: {
      width: "100%",
      padding: "6px 40px 6px 15px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: ".75rem",
    },
    chatMessages: {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      flex: "1",
      overflowY: "auto",
    },
    chatMessage: {
      display: "flex",
      margin: "0 50px",
      marginBottom: "10px",
      maxWidth: "100%",
    },
    chatMessageSender: {
      justifyContent: "flex-end",
      alignItems: "flex-end",
      marginLeft: "auto",
      maxWidth: "50%",
    },
    chatMessageReceiver: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginRight: "auto",
      maxWidth: "50%",
    },
    chatBubble: {
      padding: "10px",
      borderRadius: "8px",
      color: "#fff",
      background: "#333",
      maxWidth: "100%",
    },
    chatBubbleSender: {
      background: "#2d3e54",
    },
    chatBubbleReceiver: {
      background: "rgba(53, 64, 77, 0.45)",
    },
    communityDetailsContainer: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      justifyContent: "space-between",
      borderBottom: "1px solid #aaa",
      padding: "10px",
      margin: "20px 30px",
    },
    communityImage: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      marginRight: "20px",
    },
    communityInfo: {
      display: "flex",
      flex: "1",
    },
    communityName: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#2d3e54",
    },
    communityDescription: {
      fontSize: "0.9rem",
      color: "#2d3e54",
    },
    inputWrapper: {
      display: "flex",
      alignItems: "center",
      padding: "10px 10px",
      marginLeft: "20px",
      position: "relative",
    },
    sendButton: {
      marginLeft: "10px",
      backgroundColor: "#35404d",
      border: "none",
      borderRadius: "4px",
      color: "#ddd",
      padding: "6px 30px",
      cursor: "pointer",
    },
  };

  return (
    <div className="chat-container" style={styles.chatContainer}>
      {window.innerWidth <= 600 && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18.5%",
            left: "10px",
            background: "transparent",
            color: "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon style={{ fontSize: "2rem" }} />
        </button>
      )}

      <div
        className="community-details-container"
        style={styles.communityDetailsContainer}
        onClick={handleProfileClick}
      >
        <Avatar
          src={community.profilePhoto}
          alt="Community Profile"
          style={styles.communityImage}
        />
        <div className="community-info" style={styles.communityInfo}>
          <span className="community-name" style={styles.communityName}>
            {community.ngoName}
          </span>
        </div>
      </div>
      <div className="chat-messages" style={styles.chatMessages}>
        {Array.isArray(chatMessages) ? (
          chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === userId || message.sender === ngoId
                  ? "sender"
                  : "receiver"
              }`}
              style={{
                ...styles.chatMessage,
                ...(message.sender === userId || message.sender === ngoId
                  ? styles.chatMessageSender
                  : styles.chatMessageReceiver),
              }}
            >
              <div
                className="chat-bubble"
                style={{
                  ...styles.chatBubble,
                  ...(message.sender === userId || message.sender === ngoId
                    ? styles.chatBubbleSender
                    : styles.chatBubbleReceiver),
                }}
              >
                {message.text}
              </div>
            </div>
          ))
        ) : (
          <p>Loading messages...</p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-wrapper" style={styles.inputWrapper}>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          <SendIcon />
        </button>
      </div>
      {isProfileOpen && <Profile />}
    </div>
  );
}
