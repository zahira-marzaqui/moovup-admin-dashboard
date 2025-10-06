import React from "react";
import useTheme from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ compact = false }) {
  const { isDark, toggle } = useTheme();

  if (compact) {
    return (
      <button
        onClick={toggle}
        aria-pressed={isDark}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        data-testid="theme-toggle-compact"
        className="p-2 rounded-md bg-transparent dark:bg-transparent text-gray-800 dark:text-gray-100 hover:bg-transparent transition"
        title={isDark ? "Switch to light" : "Switch to dark"}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-gray-100" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-400" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      data-testid="theme-toggle"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-transparent dark:bg-transparent border border-gray-200 dark:border-white/10 shadow-sm hover:bg-transparent transition-colors text-gray-700 dark:text-gray-100 font-semibold"
    >
      {isDark ? (
        <Moon className="w-5 h-5 text-gray-100" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
      <span className="hidden sm:inline">Theme</span>
    </button>
  );
}
