import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentViewProfile.css";

const StudentViewProfile = () => {
  const [user, setUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const { userId: routeUserId } = useParams();
  const localUserId = localStorage.getItem("userId");
  const userId = routeUserId || localUserId;

  // ✅ Load student profile
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
        .then((res) => setCurrentRole(res.data.user.role))
        .catch((err) => console.error("Failed to fetch user role", err));
    }
  }, [userId]);

  // ✅ Load reviews for this student
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/reviews/student/${userId}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Failed to load reviews", err));
    }
  }, [userId]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <Header />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-content">
          <h1>Student Profile</h1>
          </div>
          <div className='bar'>

              <h3>Picture</h3>
              </div>
          {user.profile_picture_url && (
            <img
              src={`http://localhost:5000/uploads/${user.profile_picture_url}`}
              alt="Profile"
              className="profile-picture"
            />
          )}
          <div className='bar'>

              <h3>Personal Information</h3>
              </div>
          <p><strong>Full Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <div className='bar'>

              <h3>Academic Background</h3>
              </div>
          <p><strong>Course:</strong> {user.course}</p>
          <p><strong>Institution:</strong> {user.institution}</p>
          <div className='bar'>

              <h3>Links</h3>
              </div>
          <p><strong>LinkedIn:</strong> <a href={user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin}</a></p>
          <p><strong>Portfolio:</strong> <a href={user.portfolio} target="_blank" rel="noopener noreferrer">{user.portfolio}</a></p>
          <div className='bar'>

              <h3>Bio</h3>
              </div>
          <p><strong>Bio:</strong> {user.bio}</p>

          {/* ✅ Skills Section */}
          {user.skills && Array.isArray(user.skills) && user.skills.length > 0 && (
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

          {/* ✅ Only show back button for employers */}
          {currentRole === "recruiter" && (
            <button
              className="back-button"
              style={{ marginTop: "20px" }}
              onClick={() => navigate("/employerjobapplicationmanagement")}
            >
              ← Back to Applications
            </button>
          )}

          <div className='bar'>

              <h3>Review</h3>
              </div>
          {/* ✅ Show reviews */}
          <div className="reviews-section" style={{ marginTop: "30px" }}>
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
  );
};

export default StudentViewProfile;