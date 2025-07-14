import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/notifications/${userId}`).then((res) => {
      setNotifications(res.data);
    });

    axios.put(`http://localhost:5000/api/notifications/${userId}/mark-read`);
  }, [userId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li key={n.id} style={{ marginBottom: "10px" }}>
              {n.message} <br />
              <small>{new Date(n.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentNotifications;