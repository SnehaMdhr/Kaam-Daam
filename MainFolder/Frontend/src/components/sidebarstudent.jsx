import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebarforstudent.css";
import {
  FaHome,
  FaSuitcase,
  FaStar,
  FaEnvelope,
  FaBuilding,
  FaCog
} from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';

const navLinks = [
  { href: "/studentdashboard", icon: <FaHome />, label: "Dashboard" },
  { href: "/studentjobs", icon: <FaSuitcase />, label: "Jobs" },
  { href: "/studentreview/", icon: <FaStar />, label: "Review", isStudent: true },
  { href: "/student/messages", icon: <FaEnvelope />, label: "Messaging", isNavigate: true },
  { href: "/studentprofile", icon: <FaBuilding />, label: "Profile" },
  { href: "/studentmyapplication", icon: <MdAssignmentTurnedIn />, label: "My Applications" },
];

const SidebarStudent = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 800px)').matches;

  // Listen for resize to force re-render if needed
  const [, setRerender] = useState(0);
  React.useEffect(() => {
    const onResize = () => setRerender(x => x + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLink = (link) => {
    setOpen(false);
    if (link.isNavigate) {
      navigate(link.href);
    } else if (link.isStudent) {
      navigate(`/studentreview/${studentId}`);
    }
    // else use <a href> for normal links
  };

  if (isMobile) {
    return (
      <>
        <button
          className="hamburger"
          aria-label="Open sidebar menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 8, position: 'fixed', top: 20, left: 20, zIndex: 2001
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        {open && (
          <>
            <div
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.15)', zIndex: 2000 }}
            />
            <nav
              style={{
                position: 'fixed', top: 0, left: 0, height: '100vh', width: 240, background: '#fff', boxShadow: '2px 0 10px rgba(0,0,0,0.08)', zIndex: 2001, display: 'flex', flexDirection: 'column', padding: 24
              }}
              role="navigation"
            >
              <button
                aria-label="Close sidebar menu"
                onClick={() => setOpen(false)}
                style={{ alignSelf: 'flex-end', background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', marginBottom: 16 }}
              >
                ×
              </button>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {navLinks.map(link => (
                  <li key={link.label}>
                    {link.isNavigate || link.isStudent ? (
                      <button onClick={() => handleLink(link)} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#222', textDecoration: 'none', fontSize: 16, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
                        {link.icon} {link.label}
                      </button>
                    ) : (
                      <a href={link.href} onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#222', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>
                        {link.icon} {link.label}
                      </a>
                    )}
                  </li>
                ))}
                <li style={{ marginTop: 24 }}>
                  <a href="/studentsetting" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#222', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>
                    <FaCog /> Settings
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </>
    );
  }

  // Desktop sidebar as before
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/studentdashboard"><FaHome className="icon" />Dashboard</a>
        </li>
        <li>
          <a href="/studentjobs"><FaSuitcase className="icon" />Jobs</a>
        </li>
        <li>
          <a href={`/studentreview/${studentId}`}><FaStar className="icon" />Review</a>
        </li>
        <li>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/student/messages")}
          ><FaEnvelope className="icon" /> 
            Messaging
          </a>
        </li>
        <li>
          <a href="/studentprofile"><FaBuilding className="icon" />Profile</a>
        </li>
        <li>
          <a href="/studentmyapplication"><MdAssignmentTurnedIn className="icon" />My Applications</a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <a href="/studentsetting"><FaCog className="icon" /> Settings</a>
      </div>
    </div>
  );
};

export default SidebarStudent;
