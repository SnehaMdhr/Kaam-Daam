import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployerStudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const employerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!employerId || !token) {
      console.error("Missing employerId or token in localStorage.");
      return;
    }

    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/messages/hired-students/${employerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error("Expected array but got:", data);
          setStudents([]);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
        setStudents([]);
      }
    };

    fetchStudents();
  }, [employerId, token]);

  const goToChat = (studentId) => {
    localStorage.setItem("lastStudentId", studentId);
    navigate(`/employer/messages/${studentId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>Select a Student to Chat</h2>

      {students.length === 0 ? (
        <div>No students found who were hired.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {students.map((student) => (
            <li
              key={student.id}
              onClick={() => goToChat(student.id)}
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
              <strong>{student.username}</strong> — {student.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployerStudentList;
