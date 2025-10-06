import React, { useState } from "react";

export default function Tabs({ items = [] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="card">
      <div className="tabs">
        {items.map((t, i) => (
          <div
            key={i}
            className={["tab", i === active ? "active" : ""].join(" ")}
            onClick={() => setActive(i)}
          >
            {t.label}
          </div>
        ))}
      </div>
      <div>
        {items[active] &&
          (typeof items[active].content === "function"
            ? items[active].content()
            : items[active].content)}
      </div>
    </div>
  );
}
