import React from "react";

export default function Icon({
  name,
  size = 18,
  color = "currentColor",
  className = "",
}) {
  const common = {
    width: size,
    height: size,
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "menu":
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      );
    case "search":
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
          <path d="M9 17a3 3 0 0 0 6 0" />
        </svg>
      );
    case "user":
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="7" r="4" />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
      );
    case "arrow-up":
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <path d="M12 19V5" />
          <path d="M6 11l6-6 6 6" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <path d="M12 5v14" />
          <path d="M6 13l6 6 6-6" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V22a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H2a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 6.1 3.3l.1.1c.5.4 1.2.5 1.8.3H8a1.7 1.7 0 0 0 1-1.5V2a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1c.6.2 1.3.1 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1c.2.6.5 1.2 1.5 1H22a2 2 0 1 1 0 4h-.2c-1 .2-1.3.9-1.5 1.5z" />
        </svg>
      );
    default:
      return null;
  }
}
