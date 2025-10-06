import { useState, useEffect, useCallback } from "react";
import theme from "../utils/theme";

// Hook to read and control theme (light | dark | system)
export default function useTheme() {
  const [current, setCurrent] = useState(() => {
    try {
      const stored = theme.getStoredTheme();
      if (stored) return stored;
      return theme.getActiveTheme();
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    // Keep in sync if something else changed storage before mount
    try {
      const stored = theme.getStoredTheme();
      if (stored && stored !== current) setCurrent(stored);
    } catch (e) {
      // noop
    }

    // listen to system preference changes (if user selected 'system')
    let mq;
    try {
      mq =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => {
        // only react if theme is set to system
        const stored = theme.getStoredTheme();
        if (!stored || stored === "system") {
          const newActive = e.matches ? "dark" : "light";
          theme.applyTheme(newActive);
        }
      };
      if (mq && mq.addEventListener) mq.addEventListener("change", listener);
      else if (mq && mq.addListener) mq.addListener(listener);
      return () => {
        if (mq && mq.removeEventListener)
          mq.removeEventListener("change", listener);
        else if (mq && mq.removeListener) mq.removeListener(listener);
      };
    } catch (e) {
      return undefined;
    }
  }, [current]);

  const setTheme = useCallback((t) => {
    theme.setTheme(t);
    setCurrent(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme(current === "dark" ? "light" : "dark");
  }, [current, setTheme]);

  const isDark =
    current === "dark" ||
    (current === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return { theme: current, setTheme, toggle, isDark };
}
