import React, { useState } from "react";

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(-1);
  function toggle(i) {
    setOpenIndex(openIndex === i ? -1 : i);
  }
  return (
    <div className="accordion">
      {items.map((it, i) => (
        <div key={i} className="accordion-item">
          <div className="accordion-header" onClick={() => toggle(i)}>
            <strong>{it.title}</strong>
            <span className="muted">{openIndex === i ? "−" : "+"}</span>
          </div>
          {openIndex === i && (
            <div className="accordion-body">
              {typeof it.content === "function" ? it.content() : it.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
