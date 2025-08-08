import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import StudentReviews from "../components/StudentReviews";
import studentImg from "../assets/image/kimti.png";
import AppliedJobs from "../assets/image/applied jobs.png";
import SaveJob from "../assets/image/savejob.png";
import RecommendJobs from "../assets/image/recommend jobs.png";
import "./studentdashboard.css";

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [upcomingJobs, setUpcomingJobs] = useState([]);
  const [studentNotifications, setStudentNotifications] = useState([]);
  const studentId = localStorage.getItem("userId");
    const rawUser = localStorage.getItem('user');
  const storedUser = rawUser ? JSON.parse(rawUser) : null;
  const token = storedUser?.token;

  const navigate = useNavigate();

  useEffect(() => {
    if (studentId && token) {
      axios
        .get(`http://localhost:5000/api/users/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStudentInfo(res.data))
        .catch((err) => console.error("Failed to fetch student info", err));
    }

    axios
      .get("http://localhost:5000/api/jobs/upcoming")
      .then((res) => setUpcomingJobs(res.data))
      .catch((err) => console.error("Failed to fetch upcoming jobs", err));
  }, [studentId, token]);

  useEffect(() => {
    const fetchStudentNotifications = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/notifications/student/recent/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        // Show only the 3 most recent notifications
        const sorted = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);

        setStudentNotifications(sorted);
      } catch (err) {
        console.error("Failed to fetch student notifications", err);
      }
    };

    if (studentId && token) {
      fetchStudentNotifications();
    }
  }, [studentId, token]);

  const handleJobClick = (jobId) => {
    navigate(`/studentviewjob/${jobId}`);
  };

  const handleNotificationClick = () => {
    navigate("/studentmyapplication");
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          {/* Top Search Bar */}
          <div className="dashboard-header">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search jobs, companies..." />
            </div>
            <Link to="/studentjobs" className="button-link">
              Browse Jobs
            </Link>
          </div>

          <div className="dashboard-body">
            {/* Left Side */}
            <div className="dashboard-main">
              <div className="profile-card">
                <div className="profile-info">
                  <h2>Welcome, {studentInfo?.username || "Student"} 👋</h2>
                  <p>Your career journey starts here.</p>
                  <strong>Find jobs that match your skills!</strong>
                </div>
                <img
                  src={
                    studentInfo?.profile_picture_url
                      ? `http://localhost:5000/uploads/${studentInfo.profile_picture_url}`
                      : studentImg
                  }
                  alt="Profile"
                  className="profile-img"
                />
              </div>

              <div className="category-boxes">
                <Link to="/studentmyapplication" className="job-card">
                  <img
                    src={AppliedJobs}
                    alt="Applied"
                    className="profile-img"
                  />
                  <p>Applied Jobs</p>
                </Link>

                <Link to="/studentsavedjobs" className="job-card">
                  <img src={SaveJob} alt="Saved" className="profile-img" />
                  <p>Saved Jobs</p>
                </Link>

                {/* Updated Link for Job Recommendations */}
                <Link to="/studentrecommendations" className="job-card">
                  <img
                    src={RecommendJobs}
                    alt="Recommendation"
                    className="profile-img"
                  />
                  <p>Job Recommendations</p>
                </Link>
              </div>

              <StudentReviews studentId={studentId} />

              <div className="cards-row">
                <div className="ratings-card">
                  <h4>Profile Strength</h4>
                  <p className="rating">85% Completed</p>
                  <ul className="stars-breakdown">
                    <li>
                      Resume{" "}
                      <div className="bar" style={{ width: "80%" }}></div>
                    </li>
                    <li>
                      Skills{" "}
                      <div className="bar" style={{ width: "90%" }}></div>
                    </li>
                    <li>
                      Experience{" "}
                      <div className="bar" style={{ width: "70%" }}></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="dashboard-sidebar">
              <h3>Notifications</h3>
              {studentNotifications.length > 0 ? (
                studentNotifications.map((note, index) => (
                  <p
                    key={index}
                    style={{
                      fontWeight: note.is_read ? "normal" : "normal",
                      cursor: "pointer",
                      marginBottom: "30px",
                    }}
                    onClick={handleNotificationClick}
                  >
                    <strong>{note.message}</strong>
                  </p>
                ))
              ) : (
                <p>No new notifications</p>
              )}

              <h3>Upcoming Deadlines</h3>
              {upcomingJobs.length === 0 ? (
                <p>No upcoming deadlines.</p>
              ) : (
                upcomingJobs.map((job) => (
                  <div
                    key={job.id}
                    className="applicant-card"
                    onClick={() => handleJobClick(job.id)}
                  >
                    <strong>
                      {job.title} – Apply by{" "}
                      {new Date(job.deadline).toLocaleDateString("en-GB")}
                    </strong>
                    <p>{job.company_name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
