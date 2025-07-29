import React, { useEffect, useState } from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import axios from "axios";
import "./studentmyapplication.css";

const StudentMyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const applicationsPerPage = 10;

  // ✅ Proper token handling
  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token || null;
  };

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    axios
      .get("http://localhost:5000/api/applications/student", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const allApplications = res.data;
        setTotalPages(Math.ceil(allApplications.length / applicationsPerPage));
        setApplications(allApplications.slice(0, applicationsPerPage));
      })
      .catch((err) => console.error("Failed to load my applications", err));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const token = getToken();
    if (!token) return;

    axios
      .get("http://localhost:5000/api/applications/student", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const allApplications = res.data;
        const offset = (page - 1) * applicationsPerPage;
        setApplications(
          allApplications.slice(offset, offset + applicationsPerPage)
        );
      })
      .catch((err) => console.error("Failed to load my applications", err));
  };

  // ✅ Helper for pagination controls
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    handlePageChange(page);
  };

  return (
    <div>
      <Header />
      <div className="applications-container">
        <Sidebar />
        <div className="apphead">
          <h1>My Applications</h1>
        </div>
        <div className="appbody">
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
                    style={{
                      color: "#1f4a5c",
                      marginTop: "8px",
                      display: "inline-block",
                    }}
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
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <span className="page" onClick={() => goToPage(currentPage - 1)}>
            &lt;
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i + 1}
              className={`page ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span className="page" onClick={() => goToPage(currentPage + 1)}>
            &gt;
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentMyApplications;
