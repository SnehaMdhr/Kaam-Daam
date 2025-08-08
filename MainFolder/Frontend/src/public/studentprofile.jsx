import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./studentprofile.css";

const StudentProfile = () => {
  const { id: routeUserId } = useParams();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = routeUserId || storedUser?.id;

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
    experience_level: "",
    skills: [{ name: "", level: "" }],
  });

  const [profilePictureFile, setProfilePictureFile] = useState(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => {
          const fetchedUser = res.data;
          setUser((prev) => ({
            ...prev,
            ...fetchedUser,
            skills:
              Array.isArray(fetchedUser.skills) && fetchedUser.skills.length > 0
                ? fetchedUser.skills
                : [{ name: "", level: "" }],
            experience_level: fetchedUser.experience_level || "",
          }));
        })
        .catch((err) => {
          console.error("Failed to load profile", err);
          toast.error("Failed to load profile. Please try again.");
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...user.skills];
    updatedSkills[index][field] = value;
    setUser((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const addSkillField = () => {
    setUser((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "", level: "" }],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (user.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
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
    formData.append("experience_level", user.experience_level);
    formData.append("skills", JSON.stringify(user.skills));
    if (profilePictureFile) {
      formData.append("profile_picture", profilePictureFile);
    }

    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="student-profile-container">
        <Sidebar />
        <h1>Student Profile</h1>

        <form className="student-profile-form" onSubmit={handleUpdate}>
          <div className="bar">
            <h3>Profile Picture</h3>
          </div>

          <label>Upload Photo</label>
          <input
            type="file"
            name="profile_picture"
            onChange={(e) => setProfilePictureFile(e.target.files[0])}
          />

          {user.profile_picture_url && (
            <img
              src={`http://localhost:5000/uploads/${user.profile_picture_url}`}
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                marginTop: "10px",
                borderRadius: "50%",
                marginLeft: "50px",
              }}
            />
          )}

          <div className="bar">
            <h3>Profile Overview</h3>
          </div>

          <label>Full Name</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            maxLength={10}
            value={user.phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setUser((prev) => ({ ...prev, phone: value }));
              }
            }}
          />

          <div className="bar">
            <h3>Academic Background</h3>
          </div>

          <label>Course / Program</label>
          <input
            type="text"
            name="course"
            value={user.course}
            onChange={handleChange}
          />

          <label>Institution / University</label>
          <input
            type="text"
            name="institution"
            value={user.institution}
            onChange={handleChange}
          />

          <div className="bar">
            <h3>Skills and Experiences</h3>
          </div>

          <label>Experience Level</label>
          <select
            name="experience_level"
            value={user.experience_level}
            onChange={handleChange}
          >
            <option value="">Select Experience</option>
            <option value="No Experience">No Experience</option>
            <option value="Some Experience">Some Experience</option>
          </select>

          <label>Skills</label>
          {user.skills.map((skill, index) => (
  <div
    key={index}
    className="skill-select-container"
  >
    <select
      value={skill.name}
      onChange={(e) =>
        handleSkillChange(index, "name", e.target.value)
      }
    >
      <option value="">Select Skill</option>
      <option value="Programming">Programming</option>
      <option value="Data Science">Data Science</option>
      <option value="Design">Design</option>
      <option value="Marketing">Marketing</option>
    </select>

    <select
      value={skill.level}
      onChange={(e) =>
        handleSkillChange(index, "level", e.target.value)
      }
    >
      <option value="">Select Level</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
  </div>
))}


          <div className="button-wrapper">
            <button type="button" onClick={addSkillField}>
              + Add Skill
            </button>
          </div>

          <div className="bar">
            <h3>Links</h3>
          </div>

          <label>LinkedIn Profile</label>
          <input
            type="url"
            name="linkedin"
            value={user.linkedin}
            onChange={handleChange}
          />

          <label>Portfolio / Website</label>
          <input
            type="url"
            name="portfolio"
            value={user.portfolio}
            onChange={handleChange}
          />

          <div className="bar">
            <h3>Bio</h3>
          </div>

          <label>Short Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
          ></textarea>

          <div className="button-wrapper">
            <button type="submit">Update Profile</button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default StudentProfile;
