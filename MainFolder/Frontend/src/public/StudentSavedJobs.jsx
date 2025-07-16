import React, { useEffect, useState } from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import styles for react-toastify
import "./savedjobs.css";

const StudentSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/saved-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSavedJobs(res.data))
      .catch((err) => console.error("Failed to load saved jobs", err));
  }, []);

  const unsaveJob = (jobId) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/saved-jobs/unsave",
        { jobId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setSavedJobs(savedJobs.filter((job) => job.id !== jobId)); // Remove job from savedJobs state
        toast.success(res.data.msg); // Show success toast
      })
      .catch((err) => {
        console.error("Failed to unsave job", err);
        toast.error("Failed to unsave job"); // Show error toast
      });
  };

  return (
    <div>
      <Header />
      <div className="job-listings">
        <Sidebar />
        <div className="job-listing-content">
          <h1>Saved Jobs</h1>
          {savedJobs.length === 0 ? (
            <p>You haven’t saved any jobs yet.</p>
          ) : (
            savedJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <h3>{job.title}</h3>
                <p>{job.description?.slice(0, 100)}...</p>
                <a href={`/studentviewjob/${job.id}`}>View Job</a>
                <button onClick={() => unsaveJob(job.id)} className="unsave-button">
                  Unsave Job
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </div>
  );
};

export default StudentSavedJobs;
