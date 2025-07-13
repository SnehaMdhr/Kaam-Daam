import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>Select an Employer to Chat</h2>

      {employers.length === 0 ? (
        <div>No employers found who hired you.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {employers.map((employer) => (
            <li
              key={employer.id}
              onClick={() => goToChat(employer.id)}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e6f7ff")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9f9f9")
              }
            >
              <strong>{employer.username}</strong> — {employer.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentEmployerList;
