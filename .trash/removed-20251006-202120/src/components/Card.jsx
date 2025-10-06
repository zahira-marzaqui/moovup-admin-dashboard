import React from "react";

export default function Card({ title, right, children, className = "" }) {
  return (
    <div className={["card", className].join(" ").trim()}>
      {(title || right) && (
        <div className="card-header">
          <div className="row" style={{ gap: 8 }}>
            {title ? <strong>{title}</strong> : null}
          </div>
          <div className="row" style={{ gap: 8 }}>
            {right}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
