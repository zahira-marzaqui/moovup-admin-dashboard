import React from "react";

export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="breadcrumbs">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">/</span>}
          {item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
