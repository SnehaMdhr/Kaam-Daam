import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import "./EmployerViewStudentProfile.css"; // Reuse the student CSS for now

const EmployerViewStudentProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load profile", err));

    axios
      .get(`http://localhost:5000/api/reviews/student/${userId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews", err));
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <HeaderForEmployer />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-content">
          <h1>{user.username}'s Profile</h1>
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

              <h3>Background</h3>
              </div>
          <p>{user.bio}</p>

          {user.skills && Array.isArray(user.skills) && user.skills.length > 0 && (
            <>
              <h3>Skills</h3>
              <ul>
                {user.skills.map((skill, index) => (
                  <li key={index}>{skill.name} — <em>{skill.level}</em></li>
                ))}
              </ul>
            </>
          )}

          <div className='bar'>

              <h3>Review</h3>
              </div>
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
          <div className="button-wrapper">          <button
            className="back-button"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/findemployees")}
          >
            ← Back to Finding Employees
          </button>

           <button
            className="back-button"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/employerdashboard")}
          >
            ← Back to Dashboard
          </button>

           <button
            className="back-button"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/empoyerjobapplicationmanagement")}
          >
            ← Back to Application Management
          </button>
          </div>

        </div>
      </div>
  );
};

export default EmployerViewStudentProfile;
