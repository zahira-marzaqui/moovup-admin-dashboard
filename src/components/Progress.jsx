import React from "react";

export default function Progress({ value = 0 }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="progress">
      <span style={{ width: `${v}%` }} />
    </div>
  );
}
