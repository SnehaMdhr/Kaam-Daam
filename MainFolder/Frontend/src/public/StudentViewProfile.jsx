import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentViewProfile.css";

const StudentViewProfile = () => {
  const [user, setUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { userId: routeUserId } = useParams();

  // ✅ Fetch user ID and role only once on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setCurrentRole(storedUser.role);
      setUserId(routeUserId || storedUser.id);
    } else {
      setUserId(routeUserId || null);
    }
  }, [routeUserId]);

  // ✅ Load student profile
  useEffect(() => {
    if (!userId || userId === "null" || isNaN(userId)) return;

    axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load profile", err));
  }, [userId]);

  // ✅ Load reviews
  useEffect(() => {
    if (!userId || userId === "null" || isNaN(userId)) return;

    axios
      .get(`http://localhost:5000/api/reviews/student/${userId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews", err));
  }, [userId]);

  if (!userId || userId === "null" || isNaN(userId)) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        ❌ Error: Invalid user ID. Please log in again.
      </div>
    );
  }

  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <Header />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-content">
          <h1>Student Profile</h1>
        </div>
        <div className="content">
          <div className="bar">
            <h3>Picture</h3>
          </div>
          {user.profile_picture_url && (
            <img
              src={`http://localhost:5000/uploads/${user.profile_picture_url}`}
              alt="Profile"
              className="profile-picture"
            />
          )}

          <div className="bar">
            <h3>Personal Information</h3>
          </div>
          <p>
            <strong>Full Name:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>

          <div className="bar">
            <h3>Academic Background</h3>
          </div>
          <p>
            <strong>Course:</strong> {user.course}
          </p>
          <p>
            <strong>Institution:</strong> {user.institution}
          </p>

          <div className="bar">
            <h3>Links</h3>
          </div>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
              {user.linkedin}
            </a>
          </p>
          <p>
            <strong>Portfolio:</strong>{" "}
            <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
              {user.portfolio}
            </a>
          </p>

          <div className="bar">
            <h3>Background</h3>
          </div>
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>

          {user.skills &&
            Array.isArray(user.skills) &&
            user.skills.length > 0 && (
              <div className="skills-section" style={{ marginTop: "20px" }}>
                <h3>Skills</h3>
                <ul>
                  {user.skills.map((skill, index) => (
                    <li key={index}>
                      {skill.name} — <em>{skill.level}</em>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {currentRole === "recruiter" && (
            <button
              className="back-button"
              style={{ marginTop: "20px" }}
              onClick={() => navigate("/employerjobapplicationmanagement")}
            >
              ← Back to Applications
            </button>
          )}

          <div className="bar">
            <h3>Reviews</h3>
          </div>
          <div className="reviews-section">
            <h3>Employer Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="review-box">
                  <strong>{r.employer_name}</strong> ({r.rating}/5)
                  <p>{r.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentViewProfile;
