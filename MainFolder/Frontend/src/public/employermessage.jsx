import React, { useEffect, useState } from "react";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import "./employermessage.css";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const EmployerMessage = () => {
  const { studentId } = useParams(); // from route: /employer/messages/:studentId
  const employerId = localStorage.getItem("userId"); // ✅ Corrected
  const token = localStorage.getItem("token"); // ✅ Required for auth
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [fetchedMessages, setFetchedMessages] = useState(false); // To track if messages are already fetched

  useEffect(() => {
    if (!employerId || !token) return;

    const fetchData = async () => {
      try {
        // Fetch chat messages
        const response = await axios.get(
          `http://localhost:5000/api/messages/${employerId}/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(Array.isArray(response.data) ? response.data : []);
        setFetchedMessages(true); // Set flag to true after fetching messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }

      try {
        // Fetch student info
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

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const messageData = {
      sender_id: Number(employerId),
      receiver_id: Number(studentId),
      content: newMsg,
    };

    // Emit message to socket server
    socket.emit("send_message", messageData);

    // Optional: save to DB
    axios
      .post("http://localhost:5000/api/messages/send", messageData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        console.error("Error sending message:", err.response?.data || err);
      });

    setNewMsg("");
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
          <h1>{studentInfo?.username}</h1>
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
          </div>

          <div className="input-box">
            <img src="https://i.imgur.com/4M34hi2.png" alt="logo" />
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
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
