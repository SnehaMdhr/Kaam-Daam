import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import "./studentnotification.css";

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notifications for the current user
    axios.get(`http://localhost:5000/api/notifications/${userId}`).then((res) => {
      setNotifications(res.data);
    });

    // Mark all notifications as read
    axios.put(`http://localhost:5000/api/notifications/${userId}/mark-read`);
  }, [userId]);

  return (
    <div>
      <Header />
      <div className="notification-page">
      <Sidebar />
       <div className="notification-main">
      <h1>Notifications</h1></div>
       <div className="notification-content">
              {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((n) => (
            <li key={n.id} className="notification-item">
              {n.message} <br />
              <small>{new Date(n.created_at).toLocaleString()}</small>
              <br />
              {/* Only show 'Message Back' button for ping notifications */}
              {n.type === 'ping' && (
                <button
                  onClick={() => navigate(`/student/messages/${n.sender_id}`)}
                  style={{
                    marginTop: "6px",
                    padding: "6px 12px",
                    backgroundColor: "#1c355e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Message Back
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>

    </div>
  );
};

export default StudentNotifications;
