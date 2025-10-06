import React, { useState } from "react";
import "./sidebar.css";

const menuItems = [
  { label: "Dashboard", icon: "home" },
  { label: "Revenue", icon: "bar-chart-2" },
  { label: "Notifications", icon: "bell" },
  { label: "Analytics", icon: "clock" },
  { label: "Likes", icon: "heart" },
  { label: "Wallets", icon: "credit-card" },
];

export default function Sidebar({ onDarkModeChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.classList.remove("dark-mode");
    }
    if (onDarkModeChange) onDarkModeChange(darkMode);
  }, [darkMode, onDarkModeChange]);

  return (
    <aside
      className={`sidebar${collapsed ? " collapsed" : ""}${
        darkMode ? " dark" : ""
      }`}
    >
      <div className="sidebar-header">
        <div
          className="logo"
          onClick={() => setCollapsed(false)}
          style={{ cursor: "pointer" }}
        >
          <span className="logo-icon">ZM</span>
        </div>
        {!collapsed && (
          <button
            className="collapse-btn styled"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
      </div>
      <div className="sidebar-menu-container">
        <nav className="sidebar-menu">
          {menuItems.map((item, idx) => (
            <div
              key={item.label}
              className={`menu-item${activeIndex === idx ? " active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            >
              <span className="icon">
                <FeatherIcon name={item.icon} />
              </span>
              {!collapsed && <span className="label">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>
      <div className="sidebar-bottom-actions">
        <div className="menu-item logout">
          <span className="icon">
            <FeatherIcon name="log-out" />
          </span>
          {!collapsed && <span className="label">Logout</span>}
        </div>
        <div className="menu-item mode-toggle">
          <span className="icon">
            <FeatherIcon name={darkMode ? "moon" : "sun"} />
          </span>
          {!collapsed && (
            <span className="label">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          )}
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode((v) => !v)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </aside>
  );
}

// Feather icon component (SVG inline)
function FeatherIcon({ name }) {
  const icons = {
    home: (
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
        <path d="M3 9l9-7 9 7" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    "bar-chart-2": (
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
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    bell: (
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
    ),
    clock: (
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    heart: (
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
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    ),
    "credit-card": (
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
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    search: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    "log-out": (
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
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    sun: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    moon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 0 1 12.21 3c0-.13 0-.26.01-.39A9 9 0 1 0 21 12.79z" />
      </svg>
    ),
  };
  return icons[name] || null;
}
