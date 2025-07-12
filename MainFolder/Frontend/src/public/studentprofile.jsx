import { React, useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/headerforemployer";
import Sidebar from "../components/sidebarstudent";
import "./studentprofile.css";

const studentprofile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    profile_picture_url: "",
    course: "",
    institution: "",
    linkedin: "",
    portfolio: "",
    bio: "",
  });

  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const userId = localStorage.getItem("userId"); // must be saved during login

  // Fetch user data on page load
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to load profile", err));
    }
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault(); // 🔐 Prevent form refresh

    // ✅ Manual phone length validation
    if (user.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("course", user.course);
    formData.append("institution", user.institution);
    formData.append("linkedin", user.linkedin);
    formData.append("portfolio", user.portfolio);
    formData.append("bio", user.bio);
    if (profilePictureFile) {
      formData.append("profile_picture", profilePictureFile);
    }

    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated!");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div>
      <Header />
      <div className="student-profile-container">
        <Sidebar />
        <h2>Student Profile</h2>

        <form className="student-profile-form">
          <label>Upload Photo</label>
          <input
            type="file"
            name="profile_picture"
            onChange={(e) => setProfilePictureFile(e.target.files[0])}
          />

          {/* ✅ Show preview if URL exists */}
          {user.profile_picture_url && (
            <img
              src={`http://localhost:5000/uploads/${user.profile_picture_url}`} // Adjust based on where you're storing
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                marginTop: "10px",
                borderRadius: "50%",
              }}
            />
          )}

          <label>Full Name</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          <label>Course / Program</label>
          <input
            type="text"
            name="course"
            value={user.course}
            onChange={handleChange}
            placeholder="e.g. BSc Computer Science"
          />

          <label>Institution / University</label>
          <input
            type="text"
            name="institution"
            value={user.institution}
            onChange={handleChange}
            placeholder="e.g. Tribhuvan University"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />

          <label>Phone Number</label>

          <input
            type="text"
            name="phone"
            value={user.phone}
            maxLength={10}
            minLength={10}
            onChange={(e) => {
              const value = e.target.value;
              // ✅ Allow only digits
              if (/^\d*$/.test(value)) {
                setUser((prev) => ({
                  ...prev,
                  phone: value,
                }));
              }
            }}
            placeholder="Enter 10-digit phone number"
          />

          <label>LinkedIn Profile</label>
          <input
            type="url"
            name="linkedin"
            value={user.linkedin}
            onChange={handleChange}
            placeholder="Paste your LinkedIn link"
          />

          <label>Portfolio / Personal Website</label>
          <input
            type="url"
            name="portfolio"
            value={user.portfolio}
            onChange={handleChange}
            placeholder="Optional"
          />

          <label>Short Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            placeholder="Write a short bio about yourself..."
          ></textarea>

          <button type="submit" onClick={handleUpdate}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default studentprofile;
