import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Fetch the user data using the token to get the userId
      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("userId", data.userId); // ✅ set it now
          localStorage.setItem("role", data.role);
          if (!data.userId) {
            navigate("/role-selection");
          } else {
            // Save userId in localStorage after successful login
            localStorage.setItem("userId", data.userId);

            // If the user already has a role, navigate to the dashboard
            if (data.role) {
              localStorage.setItem("role", data.role);

              if (data.role === "job_seeker") {
                navigate("/studentdashboard");
              } else if (data.role === "recruiter") {
                navigate("/employerdashboard");
              }
            } else {
              navigate("/role-selection");
            }
          }
        })

        .catch(() => {
          alert("Login failed");
          navigate("/login");
        });
    } else {
      alert("Login failed");
      navigate("/login");
    }
  }, []);

  return <p>Redirecting...</p>;
};

export default GoogleRedirect;
