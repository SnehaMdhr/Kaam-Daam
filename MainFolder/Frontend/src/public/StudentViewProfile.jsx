import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import { useNavigate } from "react-router-dom";
import "./StudentViewProfile.css";

const StudentViewProfile = () => {
  const [user, setUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // ✅ Load profile of this student
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to load profile", err));
    }

    // ✅ Load current logged-in user's role
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCurrentRole(res.data.role)) // "job_seeker" or "recruiter"
        .catch((err) => console.error("Failed to fetch current user role", err));
    }
  }, [userId]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <Header />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-content">
          <h2>Student Profile</h2>
          {user.profile_picture_url && (
            <img
              src={`http://localhost:5000/uploads/${user.profile_picture_url}`}
              alt="Profile"
              className="profile-picture"
            />
          )}
          <p><strong>Full Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Course:</strong> {user.course}</p>
          <p><strong>Institution:</strong> {user.institution}</p>
          <p><strong>LinkedIn:</strong> <a href={user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin}</a></p>
          <p><strong>Portfolio:</strong> <a href={user.portfolio} target="_blank" rel="noopener noreferrer">{user.portfolio}</a></p>
          <p><strong>Bio:</strong> {user.bio}</p>

          {/* ✅ Back button only for employers */}
          {currentRole === "recruiter" && (
            <button
              className="back-button"
              style={{ marginTop: "20px" }}
              onClick={() => navigate("/empoyerjobapplicationmanagement")}
            >
              ← Back to Applications
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentViewProfile;