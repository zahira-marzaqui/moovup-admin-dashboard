import React from "react";

export default function Legend({ items = [] }) {
  return (
    <div className="legend">
      {items.map((it, i) => (
        <div key={i} className="legend-item">
          <span className="legend-dot" style={{ background: it.color }} />
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
}
