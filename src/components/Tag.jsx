import React from "react";

export default function Tag({ color = "#6366f1", children }) {
  return (
    <span className="tag">
      <span className="dot" style={{ background: color }} />
      {children}
    </span>
  );
}
