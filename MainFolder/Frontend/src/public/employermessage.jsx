import React, { useEffect, useState, useRef } from "react";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import "./employermessage.css";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

// Socket connection
const socket = io("http://localhost:5000");

const EmployerMessage = () => {
  const { studentId } = useParams(); // from route: /employer/messages/:studentId
  const employerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [fetchedMessages, setFetchedMessages] = useState(false);

  const bottomRef = useRef(null); // 👈 for auto scroll

  useEffect(() => {
    if (!employerId || !token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/${employerId}/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(Array.isArray(response.data) ? response.data : []);
        setFetchedMessages(true);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudentInfo(res.data);
      } catch (err) {
        console.error("Error fetching student info:", err);
      }
    };

    if (!fetchedMessages) {
      fetchData();
    }

    // Listen for incoming messages
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
    return () => socket.off("receive_message", handleReceive);
  }, [studentId, employerId, token, fetchedMessages]);

  // ✅ Auto scroll to bottom when messages update
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const messageData = {
      sender_id: Number(employerId),
      receiver_id: Number(studentId),
      content: newMsg,
      timestamp: new Date().toISOString(),
    };

    socket.emit("send_message", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMsg("");
  };

  // ✅ Send on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      <HeaderForEmployer />
      <div className="chat-container">
        <Sidebar />
        <div className="sidebar1">
          <h1>Messages</h1>
          <ul>
            <li>
              <div className="avatar">{studentInfo?.username?.[0]}</div>
              <div className="user-info">
                <strong>{studentInfo?.username}</strong>
                <br />
                <span>{studentInfo?.course || "Student"}</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="chat-box">
          <div className="chat-header">
            <h1>{studentInfo?.username}</h1>
          </div>

          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender_id === Number(employerId)
                    ? "kaam-message"
                    : "user-message"
                }`}
              >
                <div className="bubble">{msg.content}</div>
                <span className="sender">
                  {msg.sender_id === Number(employerId)
                    ? "You"
                    : studentInfo?.username}
                </span>
              </div>
            ))}
            <div ref={bottomRef}></div> {/* 👈 Auto scroll anchor */}
          </div>

          <div className="input-box">
            <img src="https://i.imgur.com/4M34hi2.png" alt="logo" />
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerMessage;
