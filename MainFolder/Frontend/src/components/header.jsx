import React, { useState } from "react";
import logo from "../assets/image/logo.png";
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h3>Kaam Daam</h3>
        </div>
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={handleMenuToggle}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className={`nav-right${menuOpen ? " open" : ""}`}>
          <ul className="nav-links">
            <li><a href="/dashboardWithout" onClick={handleLinkClick}>Home</a></li>
            <li><a href="/about" onClick={handleLinkClick}>About</a></li>
            <li><a href="/service" onClick={handleLinkClick}>Service</a></li>
            <li><a href="/help" onClick={handleLinkClick}>Help</a></li>
            <li><a href="/contact" onClick={handleLinkClick}>Contact Us</a></li>
          </ul>
          <a href="/login" onClick={handleLinkClick}>
            <button className="login-btn">Login/Signup</button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;