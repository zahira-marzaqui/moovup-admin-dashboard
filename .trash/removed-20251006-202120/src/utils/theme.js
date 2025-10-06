// Robust theme manager (dark/light/system) with legacy compatibility
const THEME_KEY = "theme"; // values: 'dark' | 'light' | 'system'

function safeLocalStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // noop
  }
}

function systemPrefersDark() {
  try {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  } catch (e) {
    return false;
  }
}

// Read stored theme, fallback to legacy 'darkMode' boolean, else null
export function getStoredTheme() {
  const t = safeLocalStorageGet(THEME_KEY);
  if (t) return t;
  const legacy = safeLocalStorageGet("darkMode");
  if (legacy === "true") return "dark";
  if (legacy === "false") return "light";
  return null;
}

export function applyTheme(theme) {
  const doc = typeof document !== "undefined" ? document.documentElement : null;
  if (!doc) return;
  // Normalize classes: we only toggle the `dark` class (Tailwind-style)
  if (theme === "dark") {
    doc.classList.add("dark");
  } else if (theme === "light") {
    doc.classList.remove("dark");
  } else if (theme === "system") {
    if (systemPrefersDark()) doc.classList.add("dark");
    else doc.classList.remove("dark");
  }
}

export function setTheme(theme) {
  safeLocalStorageSet(THEME_KEY, theme);
  // keep legacy key for backwards compatibility
  if (theme === "dark") safeLocalStorageSet("darkMode", "true");
  if (theme === "light") safeLocalStorageSet("darkMode", "false");
  applyTheme(theme);
}

// Initialize theme early (call before React render to avoid flash)
export function initTheme() {
  const stored = getStoredTheme();
  const toApply = stored || "system";
  applyTheme(toApply);
  return toApply;
}

// Returns 'dark'|'light' based on active class or system when no stored value
export function getActiveTheme() {
  const stored = getStoredTheme();
  if (stored === "dark" || stored === "light" || stored === "system")
    return stored;
  return systemPrefersDark() ? "dark" : "light";
}

const themeManager = {
  initTheme,
  applyTheme,
  setTheme,
  getStoredTheme,
  getActiveTheme,
};
export default themeManager;
