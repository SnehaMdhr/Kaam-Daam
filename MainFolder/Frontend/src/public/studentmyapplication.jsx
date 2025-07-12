import React, { useEffect, useState } from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import axios from "axios";
import "./studentmyapplication.css";

const StudentMyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/applications/student", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Failed to load my applications", err));
  }, []);

  return (
    <div>
      <Header />
      <div className="applications-container">
        <Sidebar />
        <h2>My Applications</h2>

        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          applications.map((app) => (
            <div className="application-card" key={app.id}>
              <div className="app-info">
                <span className={`app-status ${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
                <h3 className="job-title">{app.title}</h3>
                <p className="company">{app.address}</p>
                <a
                  href={`/studentviewjob/${app.job_id}`}
                  className="view-link"
                  style={{ color: "#3b82f6", marginTop: "8px", display: "inline-block" }}
                >
                  View Job
                </a>
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
                alt="Job visual"
              />
            </div>
          ))
        )}

        <div className="view-more">+ view more</div>
      </div>
    </div>
  );
};

export default StudentMyApplications;