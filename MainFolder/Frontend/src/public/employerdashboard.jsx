import React, { useEffect, useState } from "react";
import "./employerdashboard.css";
import { FaSearch, FaStar } from "react-icons/fa";
import girl from "../assets/image/employerdashboard.png";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import tech from "../assets/image/tech.png";
import design from "../assets/image/design.png";
import writing from "../assets/image/writing.png";
import marketing from "../assets/image/marketing.png";
import video from "../assets/image/video.png";
import { Link } from "react-router-dom";

const Employerdashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/notifications/recent/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    const fetchApplicants = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/applications/new-applicants/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setApplicants(data);
      } catch (err) {
        console.error("Failed to fetch applicants", err);
      }
    };

    fetchNotifications();
    fetchApplicants();
  }, [userId, token]);

  const handleMarkAllAsRead = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/notifications/${userId}/mark-read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updated = notifications.map((note) => ({
        ...note,
        is_read: true,
      }));
      setNotifications(updated);
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  return (
    <div>
      <HeaderForEmployer />
      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          <div className="dashboard-header">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>
            <Link to="/findemployees" className="button-link">
              Find Employee
            </Link>
          </div>

          <div className="dashboard-body">
            <div className="dashboard-main">
              <div className="profile-card">
                <div className="profile-info">
                  <h2>Softwarica College</h2>
                  <p>IT & E-Commerce</p>
                  <strong>Are you looking for employees?</strong>
                </div>
                <img src={girl} alt="student" className="profile-img" />
              </div>

              <div className="category-boxes">
                {[
                  { img: tech, label: "Technology & IT" },
                  { img: design, label: "Design & Creativity" },
                  { img: writing, label: "Writing & Content Creation" },
                  { img: marketing, label: "Digital Marketing" },
                  { img: video, label: "Video & Photography" },
                ].map(({ img, label }) => (
                  <div className="job-card" key={label}>
                    <img src={img} alt={label} />
                    <p>{label}</p>
                  </div>
                ))}
              </div>

              <div className="cards-row">
                <div className="ratings-card">
                  <h4>Ratings & Reviews</h4>
                  <p className="rating">
                    <FaStar color="#FFD700" /> 4.7 – 125 reviews
                  </p>
                  <ul className="stars-breakdown">
                    <li>
                      5 ★ <div className="bar" style={{ width: "50%" }}></div>
                    </li>
                    <li>
                      4 ★ <div className="bar" style={{ width: "30%" }}></div>
                    </li>
                    <li>
                      3 ★ <div className="bar" style={{ width: "10%" }}></div>
                    </li>
                    <li>
                      2 ★ <div className="bar" style={{ width: "5%" }}></div>
                    </li>
                    <li>
                      1 ★ <div className="bar" style={{ width: "5%" }}></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="dashboard-sidebar">
              <h3>Notifications</h3>
              {notifications.length > 0 ? (
                <>
                  {notifications.slice(0, 3).map((note, index) => (
                    <p
                      key={index}
                      style={{
                        fontWeight: note.is_read ? "normal" : "normal",
                      cursor: "pointer", marginBottom:"30px",
                      }}
                    >
                      <strong>
                        {note.sender_name && note.sender_id ? (
                          <Link to={`/employer/view-student/${note.sender_id}`}>
                            {note.sender_name}
                          </Link>
                        ) : (
                          "Notification"
                        )}
                        {": "}
                      </strong>
                      {note.message}
                    </p>
                  ))}
                  <button
  onClick={handleMarkAllAsRead}
  className="mark-read-btn"
  style={{ marginBottom: "10px" }}
>
                    Mark all as read
                  </button>
                </>
              ) : (
                <p>No new notifications</p>
              )}

              <h3>New Applicants</h3>
              {applicants.length > 0 ? (
                applicants.map((app, index) => (
                  <Link
                    to={`/employer/view-student/${app.id}`} // or app.user_id if that's what you return
                    key={index}
                    className="applicant-card"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <strong>{app.username}</strong>
                    <p>
                      {app.skills && app.skills.length > 0
                        ? `${app.skills[0].name} - ${app.skills[0].level}`
                        : "No Skills Listed"}
                    </p>
                  </Link>
                ))
              ) : (
                <p>No recent applicants</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employerdashboard;
