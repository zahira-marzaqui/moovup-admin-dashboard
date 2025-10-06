import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/dark-mode.css";
import App from "./App";
import theme from "./utils/theme";

// Initialize theme early to avoid flash (reads storage and applies .dark as needed)
try {
  theme.initTheme();
} catch (e) {
  // noop
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
