import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage on Role Selection Page:", token);

    if (!token) {
      alert("You must be logged in to select a role.");
      navigate("/login");
    }
  }, [navigate]);

  const handleRoleSelection = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to select a role.");
      navigate("/login");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("role", role);
      if (role === "job_seeker") {
        navigate("/studentdashboard");
      } else if (role === "recruiter") {
        navigate("/employerdashboard");
      }
    } else {
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div>
      <h2>Choose Your Role</h2>
      <form onSubmit={handleRoleSelection}>
        <label>
          <input
            type="radio"
            name="role"
            value="job_seeker"
            onChange={(e) => setRole(e.target.value)}
          />
          Job Seeker
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="recruiter"
            onChange={(e) => setRole(e.target.value)}
          />
          Recruiter
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RoleSelection;
