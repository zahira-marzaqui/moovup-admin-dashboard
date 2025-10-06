import React, { useState } from "react";
import "./navbar.css";

export default function Navbar({ darkMode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <nav className={`main-navbar${darkMode ? " dark" : ""}`}>
      <div className="navbar-icon">
        {/* Dashboard icon */}
        <svg
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      </div>
      <div className="navbar-links">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#playground">Playground</a>
        <a href="#resource">Resource</a>
      </div>
      <button className="navbar-btn">Copy this email</button>
      <div className="navbar-profile-dropdown">
        <button
          className="navbar-icon-btn notification-btn"
          aria-label="Notifications"
          onClick={() => setNotifOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        {notifOpen && (
          <div
            className={`dropdown-menu notif-menu${darkMode ? " dark" : ""}`}
            style={{ right: 50 }}
          >
            <div className="dropdown-item">No new notifications</div>
            <div className="dropdown-item">Welcome to the app!</div>
          </div>
        )}
        <button
          className="navbar-icon-btn profile-btn"
          onClick={() => setDropdownOpen((v) => !v)}
          aria-label="Profile"
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="profile-img"
          />
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">Profile</div>
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item">Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
}
