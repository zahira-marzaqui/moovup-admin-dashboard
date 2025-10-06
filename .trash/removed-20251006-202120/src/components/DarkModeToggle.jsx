import React, { useState, useEffect } from "react";
import theme from "../utils/theme";

export default function DarkModeToggle({ compact = false }) {
  const [activeTheme, setActiveTheme] = useState(() => {
    try {
      const stored = theme.getStoredTheme();
      if (stored) return stored;
      return theme.getActiveTheme();
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    // ensure UI matches stored theme at mount
    try {
      const stored = theme.getStoredTheme();
      if (stored) setActiveTheme(stored);
    } catch (e) {
      // noop
    }
  }, []);

  const toggle = () => {
    const next = activeTheme === "dark" ? "light" : "dark";
    theme.setTheme(next);
    setActiveTheme(next);
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={activeTheme === "dark"}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 transition-colors bg-white/90 dark:bg-white/5 text-gray-700 dark:text-gray-100"
        title={
          activeTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
      >
        {activeTheme === "dark" ? (
          <svg
            className="w-5 h-5 text-yellow-400 icon-current"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-700 icon-current"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={activeTheme === "dark"}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 shadow-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-900 font-semibold"
    >
      {activeTheme === "dark" ? (
        <svg
          className="w-5 h-5 text-yellow-400 icon-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-gray-700 icon-current"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
      <span className="text-sm text-gray-700 dark:text-gray-900 font-semibold">
        Theme
      </span>
    </button>
  );
}
