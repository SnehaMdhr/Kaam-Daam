import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./studentmessage.css";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import axios from "axios";

// 🔌 Socket connection (only one instance globally)
const socket = io("http://localhost:5000");

const StudentMessage = () => {
  const studentId = parseInt(localStorage.getItem("userId"));
  const employerId = parseInt(localStorage.getItem("lastEmployerId"));
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [employerInfo, setEmployerInfo] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState(false);

  const bottomRef = useRef(null); // ✅ for auto scroll

  if (!studentId || !employerId || !token) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        ❌ Error: Missing student or employer info. Please go back and select an
        employer.
      </div>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch chat history
        const response = await axios.get(
          `http://localhost:5000/api/messages/${studentId}/${employerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setMessages(Array.isArray(response.data) ? response.data : []);
        setFetchedMessages(true);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }

      try {
        // Fetch employer info
        const res = await axios.get(
          `http://localhost:5000/api/users/${employerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployerInfo(res.data);
      } catch (err) {
        console.error("Error fetching employer info:", err);
      }

      try {
        // Fetch job title
        const res = await axios.get(
          `http://localhost:5000/api/jobs/employer/${employerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (Array.isArray(res.data) && res.data.length > 0) {
          setJobTitle(res.data[0].title);
        }
      } catch (err) {
        console.error("Error fetching job title:", err);
      }
    };

    if (!fetchedMessages) {
      fetchData();
    }

    const handleReceive = (message) => {
      setMessages((prev) => {
        const exists = prev.some(
          (msg) =>
            msg.sender_id === message.sender_id &&
            msg.receiver_id === message.receiver_id &&
            msg.content === message.content &&
            Math.abs(new Date(msg.timestamp) - new Date(message.timestamp)) < 2000
        );
        return exists ? prev : [...prev, message];
      });
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [studentId, employerId, token, fetchedMessages]);

  // ✅ Auto scroll to bottom when messages update
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        sender_id: studentId,
        receiver_id: employerId,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      socket.emit("send_message", messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    }
  };

  // ✅ Send on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
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
              <div className="avatar">{employerInfo?.username?.[0] || "E"}</div>
              <div className="user-info">
                <strong>
                  {employerInfo?.username || `Employer #${employerId}`}
                </strong>
                <br />
                <span>{jobTitle || "Loading job..."}</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="chat-box">
          <div className="chat-header">
            <h1>{employerInfo?.username || "Employer"}</h1>
          </div>

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
                  {message.sender_id === studentId
                    ? "You"
                    : employerInfo?.username}
                </span>
              </div>
            ))}
            <div ref={bottomRef}></div> {/* 👈 Anchor to scroll to */}
          </div>

          <div className="input-box">
            <img src="https://i.imgur.com/4M34hi2.png" alt="logo" />
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMessage;
