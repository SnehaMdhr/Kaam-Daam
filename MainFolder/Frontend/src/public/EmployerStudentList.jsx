import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import "./employerstudentlist.css"

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
    <div>
      <HeaderForEmployer/>
    
    <div className="employer-student-list">
      
      <Sidebar/>
      <h1>Select a Student to Chat</h1>

      {students.length === 0 ? (
        <div className="student-list">No students found who were hired.</div>
      ) : (
        <ul>
          {students.map((student) => (
            <li
              key={student.id}
              onClick={() => goToChat(student.id)}
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
    </div>
  );
};

export default EmployerStudentList;
