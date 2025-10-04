import React, { useState } from "react";

export default function Toggle({ defaultOn = false, onChange }) {
  const [on, setOn] = useState(defaultOn);
  function toggle() {
    const next = !on;
    setOn(next);
    onChange && onChange(next);
  }
  return (
    <div
      className={["toggle", on ? "on" : ""].join(" ")}
      onClick={toggle}
      role="switch"
      aria-checked={on}
    />
  );
}
