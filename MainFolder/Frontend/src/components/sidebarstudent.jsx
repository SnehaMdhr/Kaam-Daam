import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebarforstudent.css";
import {
  FaHome,
  FaSuitcase,
  FaStar,
  FaEnvelope,
  FaBuilding,
  FaCog,
} from "react-icons/fa";
import { MdAssignmentTurnedIn } from "react-icons/md";

const SidebarStudent = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(null);
  const [open, setOpen] = useState(false);
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 800px)").matches;

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.id) {
        setStudentId(storedUser.id);
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
    }
  }, []);

  const handleLink = (link) => {
    setOpen(false);
    if (link.dynamic && studentId) {
      navigate(link.href.replace(":id", studentId));
    } else {
      navigate(link.href);
    }
  };

  const navLinks = [
    { href: "/studentdashboard", icon: <FaHome />, label: "Dashboard" },
    { href: "/studentjobs", icon: <FaSuitcase />, label: "Jobs" },
    {
      href: "/studentreview/:id",
      icon: <FaStar />,
      label: "Review",
      dynamic: true,
    },
    {
      href: "/student/messages",
      icon: <FaEnvelope />,
      label: "Messaging",
    },
    {
      href: "/studentprofile/:id",
      icon: <FaBuilding />,
      label: "Profile",
      dynamic: true,
    },
    {
      href: "/studentmyapplication",
      icon: <MdAssignmentTurnedIn />,
      label: "My Applications",
    },
  ];

  // 🟦 Mobile Sidebar
  if (isMobile) {
    return (
      <>
        <button
          className="hamburger"
          aria-label="Open sidebar menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 2001,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        {open && (
          <>
            <div
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.15)",
                zIndex: 2000,
              }}
            />
            <nav
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: 240,
                background: "#fff",
                boxShadow: "2px 0 10px rgba(0,0,0,0.08)",
                zIndex: 2001,
                display: "flex",
                flexDirection: "column",
                padding: 24,
              }}
              role="navigation"
            >
              <button
                aria-label="Close sidebar menu"
                onClick={() => setOpen(false)}
                style={{
                  alignSelf: "flex-end",
                  background: "none",
                  border: "none",
                  fontSize: 28,
                  cursor: "pointer",
                  marginBottom: 16,
                }}
              >
                ×
              </button>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLink(link)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        color: "#222",
                        textDecoration: "none",
                        fontSize: 16,
                        fontWeight: 500,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {link.icon} {link.label}
                    </button>
                  </li>
                ))}
                <li style={{ marginTop: 24 }}>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/studentsetting");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "#222",
                      fontSize: 16,
                      fontWeight: 500,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <FaCog /> Settings
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </>
    );
  }

  // 🖥 Desktop Sidebar
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button
            onClick={() => navigate("/studentdashboard")}
            className="link-button"
          >
            <FaHome className="icon" />
            Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/studentjobs")}
            className="link-button"
          >
            <FaSuitcase className="icon" />
            Jobs
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate(`/studentreview/${studentId}`)}
            className="link-button"
          >
            <FaStar className="icon" />
            Review
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/student/messages")}
            className="link-button"
          >
            <FaEnvelope className="icon" />
            Messaging
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate(`/studentprofile/${studentId}`)}
            className="link-button"
          >
            <FaBuilding className="icon" />
            Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/studentmyapplication")}
            className="link-button"
          >
            <MdAssignmentTurnedIn className="icon" />
            My Applications
          </button>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button
          onClick={() => navigate("/studentsetting")}
          className="link-button"
        >
          <FaCog className="icon" /> Settings
        </button>
      </div>
    </div>
  );
};

export default SidebarStudent;
