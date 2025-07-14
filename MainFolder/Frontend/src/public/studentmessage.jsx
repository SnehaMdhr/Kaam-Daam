import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./studentmessage.css";
import Header from "../components/headerforstudent"
import Sidebar from "../components/sidebarstudent"


// Socket connection
const socket = io("http://localhost:5000");

const StudentMessage = () => {
  const studentId = parseInt(localStorage.getItem("userId"));
  const employerId = parseInt(localStorage.getItem("lastEmployerId")); // ✅ use last selected employer
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Handle missing data
  if (!studentId || !employerId || !token) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        ❌ Error: Missing student or employer info. Please go back and select an
        employer.
      </div>
    );
  }

  // Fetch existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/messages/${studentId}/${employerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Unexpected response format:", data);
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on("receive_message", (message) => {
      if (
        (message.sender_id === studentId &&
          message.receiver_id === employerId) ||
        (message.sender_id === employerId && message.receiver_id === studentId)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [studentId, employerId]);

  // Send a message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        sender_id: studentId,
        receiver_id: employerId,
        content: newMessage,
      };

      // Emit to Socket.IO
      socket.emit("send_message", messageData);

      // Save to DB
      try {
        await fetch("http://localhost:5000/api/messages/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        });
      } catch (err) {
        console.error("Failed to save message:", err);
      }

      setNewMessage("");
    }
  };

  return (
    <div>
      <Header />
      <div className="chat-container">
        <Sidebar />
        <div className="sidebar1">
          <h1>Messages</h1>
          <ul>
            <li>
              <div className="avatar">E</div>
              <div className="user-info">
                <strong>Employer #{employerId}</strong>
                <br />
                <span>Chatting</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="chat-box">
          <h1>Chat</h1>
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender_id === studentId
                    ? "user-message"
                    : "kaam-message"
                }`}
              >
                <div className="bubble">{message.content}</div>
                <span className="sender">
                  {message.sender_id === studentId ? "You" : "Employer"}
                </span>
              </div>
            ))}
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMessage;
