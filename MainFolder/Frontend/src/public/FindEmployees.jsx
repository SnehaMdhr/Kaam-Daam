import React, { useState, useEffect } from "react";
import axios from "axios";

const FindEmployees = () => {
  const [query, setQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/users/search/students",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/users/search/students",
        {
          params: {
            query: query || undefined,
            skill: selectedSkill || undefined,
            experience_level: experienceLevel || undefined,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 Find Employees</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search by name or skill..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px" }}
        />

        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All Skills</option>
          <option value="Programming">Programming</option>
          <option value="Data Science">Data Science</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All Experience</option>
          <option value="No Experience">No Experience</option>
          <option value="Some Experience">Some Experience</option>
        </select>

        <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
          Search
        </button>
      </div>

      <div>
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <img
                src={`http://localhost:5000/uploads/${
                  student.profile_picture_url || "default.png"
                }`}
                alt="Profile"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <h3>{student.username}</h3>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
              <p>
                <strong>Institution:</strong> {student.institution}
              </p>
              <p>
                <strong>Experience:</strong> {student.experience_level || "N/A"}
              </p>
              <p>
                <strong>Skills:</strong>{" "}
                {Array.isArray(student.skills) && student.skills.length > 0
                  ? student.skills
                      .map((s) => `${s.name} (${s.level})`)
                      .join(", ")
                  : "N/A"}
              </p>
              <p>
                <strong>Bio:</strong> {student.bio}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FindEmployees;
