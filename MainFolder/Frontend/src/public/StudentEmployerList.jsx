import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import "./studentemployerlist.css"; // Optional for custom styles

const StudentEmployerList = () => {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);

  const studentId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!studentId || !token) {
      console.error("Missing studentId or token in localStorage.");
      return;
    }

    const fetchEmployers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/messages/hired-employers/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setEmployers(data);
        } else {
          console.error("Expected array but got:", data);
          setEmployers([]);
        }
      } catch (error) {
        console.error("Failed to fetch employers:", error);
        setEmployers([]);
      }
    };

    fetchEmployers();
  }, [studentId, token]);

  const goToChat = (employerId) => {
    localStorage.setItem("lastEmployerId", employerId);
    navigate(`/student/messages/${employerId}`);
  };

  return (
    <div>
      <Header />
      <div className="student-employer-container">
        <Sidebar />
        <div className="employer-list-content">
          <h2>Select an Employer to Chat</h2>

          {employers.length === 0 ? (
            <div>No employers found who hired you.</div>
          ) : (
            <ul className="employer-list">
              {employers.map((employer) => (
                <li
                  key={employer.id}
                  onClick={() => goToChat(employer.id)}
                  className="employer-card"
                >
                  <strong>{employer.username}</strong> — {employer.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentEmployerList;
