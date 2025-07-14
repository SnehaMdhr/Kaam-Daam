import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import "./EmployerNotifications.css"; // Assuming you have some styles for this component


const EmployerNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const employerId = localStorage.getItem("userId");

    useEffect(() => {
        console.log("Employer ID in frontend:", employerId); // 👀 Log userId

        axios
            .get(`http://localhost:5000/api/notifications/${employerId}`)
            .then((res) => {
                console.log("Fetched notifications:", res.data); // 👀 Log response
                setNotifications(res.data);
            })
            .catch((err) => console.error("Failed to fetch notifications", err));

        axios
            .put(`http://localhost:5000/api/notifications/${employerId}/mark-read`)
            .catch((err) => console.error("Failed to mark notifications as read", err));
    }, [employerId]);
    return (
  <div>
    <HeaderForEmployer />
    <div className="notification-page">
      <Sidebar />
      <div className="notification-main">
        <h1>Notifications</h1>
        {notifications.length === 0 ? (
          <p>No notifications yet.</p>
        ) : (
          <ul className="notification-list">
            {notifications.map((note) => (
              <li key={note.id} className="notification-item">
                <div>{note.message}</div>
                <small>{new Date(note.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);
};

export default EmployerNotifications;