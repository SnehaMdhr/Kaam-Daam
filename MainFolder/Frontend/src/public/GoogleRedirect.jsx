import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
  const token = new URLSearchParams(window.location.search).get("token");
  if (token) {
    localStorage.setItem("token", token);

    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.user.role) {
          navigate("/role-selection");
        } else {
          localStorage.setItem("role", data.user.role);
          navigate(`/${data.user.role}_dashboard`);
        }
      });
  } else {
    alert("Login failed");
    navigate("/login");
  }
}, []);

    return <p>Redirecting...</p>;
};

export default GoogleRedirect;
