import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import "./EmployerViewProfile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
  if (userId) {
    axios
      .get(`http://localhost:5000/api/employers/${userId}`)  // Use the correct API endpoint for employers
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Failed to load profile', err));
  }
}, [userId]);


  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <Header />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-content">
          <h2>Company Profile</h2>

          {user.profile_picture_url ? (
            <img
              src={`http://localhost:5000/uploads/${user.profile_picture_url}`}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <div className="profile-placeholder">No profile picture</div>
          )}

          <p>
            <strong>Company Name:</strong> {user.username || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || "N/A"}
          </p>
          <p>
            <strong>Industry:</strong> {user.industry || "N/A"}
          </p>

          {user.website && (
            <p>
              <strong>Website:</strong>{" "}
              <a href={user.website} type="url" target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </p>
          )}

          {user.linkedin && (
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                {user.linkedin}
              </a>
            </p>
          )}

          {user.facebook && (
            <p>
              <strong>Facebook:</strong>{" "}
              <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                {user.facebook}
              </a>
            </p>
          )}

          <p>
            <strong>Description:</strong>{" "}
            {user.comp_description ? user.comp_description : "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
