import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./studentmessage.css";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import axios from "axios";

// Socket connection
const socket = io("http://localhost:5000");

const StudentMessage = () => {
  const studentId = parseInt(localStorage.getItem("userId"));
  const employerId = parseInt(localStorage.getItem("lastEmployerId"));
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [employerInfo, setEmployerInfo] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState(false); // To track if messages are already fetched

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
        // Fetch messages from backend
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
        setFetchedMessages(true); // Set flag to true after fetching messages
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

    // Listen for socket messages
    socket.on("receive_message", (message) => {
      // Avoid adding duplicate messages
      if (
        !messages.some(
          (msg) =>
            msg.sender_id === message.sender_id &&
            msg.receiver_id === message.receiver_id &&
            msg.content === message.content
        )
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off("receive_message");
  }, [studentId, employerId, token, messages, fetchedMessages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        sender_id: studentId,
        receiver_id: employerId,
        content: newMessage,
      };

      // Emit message to socket server
      socket.emit("send_message", messageData);

      try {
        // Send message to backend to save in DB
        await axios.post(
          "http://localhost:5000/api/messages/send",
          messageData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
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
          <h1>{employerInfo?.username || "Employer"}</h1></div>
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
          </div>

          <div className="input-box">
            <img src="https://i.imgur.com/4M34hi2.png" alt="logo" />
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
