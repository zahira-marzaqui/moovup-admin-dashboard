import React from "react";

export default function Pagination({ page = 1, total = 5, onChange }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="pagination">
      {pages.map((p) => (
        <button
          key={p}
          className={["page", p === page ? "active" : ""].join(" ")}
          onClick={() => onChange && onChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
