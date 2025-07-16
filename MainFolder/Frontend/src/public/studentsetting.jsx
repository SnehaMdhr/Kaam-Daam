import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import { ToastContainer, toast } from "react-toastify"; // Added ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importing Toastify styles
import "./studentsetting.css";

const StudentSetting = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // saved during login

  /* ──────────────────────────────────
      Fetch user data on first render
  ─────────────────────────────────── */
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("Failed to load settings", err);
          toast.error("Failed to load settings. Please try again.");
        });
    }
  }, [userId]);

  /* ──────────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is 'phone', validate the length to ensure it's exactly 10 digits.
    if (name === "phone") {
      if (value.length <= 10 && /^\d*$/.test(value)) { // Allow only numeric characters and limit to 10 digits
        setUser((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else if (name !== "phone") {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = () => {
    // Remove skills from the user object if it's not part of the form
    const { skills, ...updatedUser } = user; // Exclude `skills` from the object

    if (user.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    axios
      .put(`http://localhost:5000/api/users/${userId}`, updatedUser)
      .then(() => {
        toast.success("Settings updated successfully!"); // Use toast for success
      })
      .catch((err) => {
        console.error("Update failed", err);
        toast.error("Failed to update settings. Please try again."); // Use toast for error
      });
  };

  /* ─────────────  NEW  ──────────── */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} /> {/* Add ToastContainer here */}
      <Header />

      <div className="settings-container">
        <Sidebar />

        <div className="settings-main">
          {/* top bar with title + logout */}
          <div className="settings-header">
            <h1>Settings</h1>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Log&nbsp;Out
          </button>

          {/* Account Information */}
          <section className="settings-section">
            <h3>Account Information</h3>

            <div className="form-group">
              <label htmlFor="applicant-name">Applicant's Name</label>
              <input
                type="text"
                id="applicant-name"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Applicant Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Applicant Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Applicant Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-person">Contact Details</label>
              <input
                type="text"
                id="contact-person"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Contact Details"
                maxLength={10} // Ensure max length is 10
              />
            </div>

            <div className="button-wrapper">
              <button onClick={handleUpdate}>Update Account</button>
            </div>
          </section>

          {/* Notifications */}
          <section className="settings-section">
            <h3>Notifications</h3>

            <div className="form-group">
              <label>
                <input type="checkbox" />
                Job Alerts: Get notified when new job opportunities matching your interests are posted.
              </label>
            </div>

            <div className="form-group">
              <label>
                <input type="checkbox" />
                Message Notifications: Receive alerts when employers respond to your applications or messages.
              </label>
            </div>

            <div className="form-group">
              <label>
                <input type="checkbox" />
                Platform Updates: Stay informed about new features, updates, and important announcements from KaamDaam.
              </label>
            </div>

            <div className="button-wrapper">
              <button>Update Notification</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentSetting;
