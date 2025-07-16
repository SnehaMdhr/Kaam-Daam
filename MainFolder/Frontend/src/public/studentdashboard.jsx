import { React, useState, useEffect } from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import { FaSearch, FaRegClock } from 'react-icons/fa';
import studentImg from '../assets/image/kimti.png'; 
import { Link, useNavigate } from 'react-router-dom';
import './studentdashboard.css';
import StudentReviews from "../components/StudentReviews"; 
import AppliedJobs from "../assets/image/applied jobs.png";
import RecommendJobs from "../assets/image/recommend jobs.png";
import axios from "axios";

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [upcomingJobs, setUpcomingJobs] = useState([]);
  const studentId = localStorage.getItem("userId");
  const navigate = useNavigate();  // To use navigation for redirect

  useEffect(() => {
    const studentId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (studentId && token) {
      axios
        .get(`http://localhost:5000/api/users/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStudentInfo(res.data))
        .catch((err) => console.error("Failed to fetch student info", err));
    }

    // Fetch upcoming jobs
    axios
      .get("http://localhost:5000/api/jobs/upcoming")
      .then((res) => setUpcomingJobs(res.data))
      .catch((err) => console.error("Failed to fetch upcoming jobs", err));
  }, []);

  // Handle navigation to job application page
  const handleJobClick = (jobId) => {
    navigate(`/studentviewjob/${jobId}`);
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
            <Link to="/studentjobs" className="button-link">Browse Jobs</Link>
          </div>

          <div className="dashboard-body">
            {/* Left Side */}
            <div className="dashboard-main">
              {/* Welcome Card */}
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

              {/* Quick Access Cards */}
              <div className="category-boxes">
                <Link to="/studentmyapplication" className="job-card">
                  <img src={AppliedJobs} alt="Applied" className="profile-img" />
                  <p>Applied Jobs</p>
                </Link>

                <Link to="/studentsavedjobs" className="job-card">
                  <FaRegClock size={30} />
                  <p>Saved Jobs</p>
                </Link>

                <div className="job-card">
                  <img src={RecommendJobs} alt="Recommendation" className="profile-img" />
                  <p>Job Recommendations</p>
                </div>
              </div>

              <StudentReviews studentId={studentId} />

              {/* Resume Stats or Skills */}
              <div className="cards-row">
                <div className="ratings-card">
                  <h4>Profile Strength</h4>
                  <p className="rating">85% Completed</p>
                  <ul className="stars-breakdown">
                    <li>Resume <div className="bar" style={{ width: '80%' }}></div></li>
                    <li>Skills <div className="bar" style={{ width: '90%' }}></div></li>
                    <li>Experience <div className="bar" style={{ width: '70%' }}></div></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="dashboard-sidebar">
              <h3>Notifications</h3>
              <p><strong>New Job Match:</strong> Junior Developer at DHI</p>
              <p><strong>Interview Invite:</strong> Softwarica College</p>
              <p><strong>Message:</strong> HR from Codemate</p>

              <h3>Upcoming Deadlines</h3>
              {upcomingJobs.length === 0 ? (
                <p>No upcoming deadlines.</p>
              ) : (
                upcomingJobs.map((job) => (
                  <div key={job.id} className="applicant-card" onClick={() => handleJobClick(job.id)}>
                    <strong>{job.title} – Apply by {new Date(job.deadline).toLocaleDateString('en-GB')}</strong>
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
