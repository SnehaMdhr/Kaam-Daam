import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaSuitcase,
  FaStar,
  FaEnvelope,
  FaBuilding,
  FaCog,
} from "react-icons/fa";
import { MdAssignmentTurnedIn } from "react-icons/md";
import "./sidebarforstudent.css";

const SidebarStudent = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 800px)").matches;

  // Re-render when window resizes (so mobile detection updates)
  const [, setRerender] = useState(0);
  useEffect(() => {
    const onResize = () => setRerender((x) => x + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sidebarList = (
    <>
      <ul>
        <li>
          <a href="/studentdashboard">
            <FaHome className="icon" /> Dashboard
          </a>
        </li>
        <li>
          <a href="/studentjobs">
            <FaSuitcase className="icon" /> Jobs
          </a>
        </li>
        <li>
          <a href={`/studentreview/${studentId}`}>
            <FaStar className="icon" /> Review
          </a>
        </li>
        <li>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/student/messages")}
          >
            <FaEnvelope className="icon" /> Messaging
          </a>
        </li>
        <li>
          <a href="/studentprofile">
            <FaBuilding className="icon" /> Profile
          </a>
        </li>
        <li>
          <a href="/studentmyapplication">
            <MdAssignmentTurnedIn className="icon" /> My Applications
          </a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <a href="/studentsetting">
          <FaCog className="icon" /> Settings
        </a>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Hamburger button */}
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
            zIndex: 2002,
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

        {/* Sidebar drawer */}
        {open && (
          <>
            {/* Overlay */}
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
            {/* Sidebar content */}
            <div
              className={`sidebar open`}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                zIndex: 2001,
                background: "#fff",
                boxShadow: "2px 0 10px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                padding: 24,
                width: 240,
              }}
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
              {sidebarList}
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop version
  return <div className="sidebar">{sidebarList}</div>;
};

export default SidebarStudent;
