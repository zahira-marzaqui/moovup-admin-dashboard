import React from "react";

export const OutlineChartIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* outer rounded square (stroke only) */}
    <rect x="3" y="3" width="18" height="18" rx="3" />
    {/* inner bars: stroke-only rectangles so icon appears as outline/dessin */}
    <rect
      x="7"
      y="10"
      width="3"
      height="7"
      rx="0.6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    />
    <rect
      x="12"
      y="7"
      width="3"
      height="10"
      rx="0.6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    />
    <rect
      x="17"
      y="13"
      width="3"
      height="4"
      rx="0.6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    />
  </svg>
);

export const OutlineBagIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 7l1-3h10l1 3" />
    <path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    <path d="M16 11a4 4 0 0 0-8 0" />
  </svg>
);

export const OutlineCalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export const OutlineClipboardIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 2h6a2 2 0 0 1 2 2v2H7V4a2 2 0 0 1 2-2z" />
    <rect x="7" y="8" width="10" height="12" rx="2" />
    <path d="M9 12h6M9 16h6" />
  </svg>
);

export const OutlineCakeIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.998 2.998 0 00-2.5 1.092V9.75A2.25 2.25 0 015.25 7.5h13.5A2.25 2.25 0 0121 9.75v5.796z" />
    <path d="M7.5 6.75V6a2.25 2.25 0 012.25-2.25h4.5A2.25 2.25 0 0116.5 6v.75" />
  </svg>
);

export const OutlineCurrencyIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
    <path d="M12 8V7m0 1v8m0 0v1" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

export const OutlineUsersIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
  </svg>
);

export const OutlineBeakerIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 2h8" />
    <path d="M9 6v5a6 6 0 001 3.5V18a2 2 0 002 2h0a2 2 0 002-2v-3.5A6 6 0 0015 11V6" />
    <path d="M6 20h12" />
  </svg>
);

const OutlineIcons = {
  OutlineChartIcon,
  OutlineBagIcon,
  OutlineCalendarIcon,
  OutlineClipboardIcon,
  OutlineCakeIcon,
  OutlineCurrencyIcon,
  OutlineUsersIcon,
  OutlineBeakerIcon,
};

export default OutlineIcons;
