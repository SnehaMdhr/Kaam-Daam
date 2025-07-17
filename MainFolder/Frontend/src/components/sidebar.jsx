import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaSuitcase,
  FaUsers,
  FaEnvelope,
  FaBuilding,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 800px)').matches;

  // Listen for resize to force re-render if needed
  const [, setRerender] = React.useState(0);
  React.useEffect(() => {
    const onResize = () => setRerender(x => x + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const sidebarList = (
    <>
      <ul>
        <li>
          <a href="/employerdashboard"><FaHome className="icon" />Dashboard</a>
        </li>
        <li>
          <a href="/employerjobposting"><FaSuitcase className="icon" />Job Postings</a>
        </li>
        <li>
          <a href="/empoyerjobapplicationmanagement"><FaUsers className="icon" />Applicant Management</a>
        </li>
        <li>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/employer/messages")}
          ><FaEnvelope className="icon" />Messaging</a>
        </li>
        <li>
          <a href="/employercompanyprofile"><FaBuilding className="icon" />Company Profile</a>
        </li>
        <li>
          <a href="/employeranalytics"><FaChartBar className="icon" />Analytics</a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <a href="/settingemployer"><FaCog className="icon" /> Settings</a>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <button
          className="hamburger"
          aria-label="Open sidebar menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 8, position: 'fixed', top: 20, left: 20, zIndex: 2002
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
            <div
              className={`sidebar open`}
              style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 2001, background: '#fff', boxShadow: '2px 0 10px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', padding: 24, width: 240 }}
            >
              <button
                aria-label="Close sidebar menu"
                onClick={() => setOpen(false)}
                style={{ alignSelf: 'flex-end', background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', marginBottom: 16 }}
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

  return (
    <div className="sidebar">
      {sidebarList}
    </div>
  );
};

export default Sidebar;
