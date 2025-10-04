import React from "react";

export function Input({ label, type = "text", className = "", ...rest }) {
  return (
    <div>
      {label ? <label className="label">{label}</label> : null}
      <input type={type} className={["input", className].join(" ")} {...rest} />
    </div>
  );
}

export function Select({ label, className = "", children, ...rest }) {
  return (
    <div>
      {label ? <label className="label">{label}</label> : null}
      <select className={["select", className].join(" ")} {...rest}>
        {children}
      </select>
    </div>
  );
}
