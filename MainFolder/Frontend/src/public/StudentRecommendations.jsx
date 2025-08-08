import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/headerforstudent";  // Assuming you have a Header component
import Sidebar from "../components/sidebarstudent";  // Assuming you have a Sidebar component
import "./StudentRecommendations.css";

function StudentRecommendations() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id || isNaN(user.id)) {
      setError("Please log in to view recommendations");
      setLoading(false);
      toast.error("Please log in to view recommendations");

      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://127.0.0.1:8000/recommend/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Student profile not found. Please complete your profile."
              : response.status === 500
              ? "Server error, please try again later."
              : "Failed to load recommendations"
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format from server.");
        }

        setJobs(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user, navigate]);

  return (
    <div className="student-dashboard-container">
      <Header /> {/* Include the Header component here */}
      <div className="dashboard-body">
        <Sidebar /> {/* Include the Sidebar component here */}
        <div className="recommendations-content">
          <h2>Recommended Jobs for You</h2>

          {loading ? (
            <p className="loading-message">Loading recommendations...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : jobs.length === 0 ? (
            <p>
              No job suggestions found. Try updating your skills or exploring
              more jobs.
            </p>
          ) : (
            <div className="job-list">
              {jobs.map((job) => (
                <div key={job.job_id} className="job-card">
                  <h3>{job.title || "Untitled Job"}</h3>
                  <p>
                    <strong>Company:</strong> {job.company_name || "Not specified"}
                  </p>
                  <p>
                    <strong>Address:</strong> {job.address || "Not specified"}
                  </p>
                  <Link
                    to={`/studentviewjob/${job.job_id}`}
                    className="view-details-button"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentRecommendations;
