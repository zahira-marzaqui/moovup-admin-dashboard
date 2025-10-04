import React from "react";
import Icon from "./Icon";

const links = [
  { label: "Dashboard", icon: "menu" },
  { label: "Analytics", icon: "arrow-up" },
  { label: "Users", icon: "user" },
  { label: "Settings", icon: "settings" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="row" style={{ gap: 10, marginBottom: 16 }}>
        <div className="pill">MyBoard</div>
      </div>
      <nav>
        {links.map((l) => (
          <div
            key={l.label}
            className="row"
            style={{
              gap: 10,
              padding: "10px 8px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            <Icon name={l.icon} />
            <span className="hide-md">{l.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
