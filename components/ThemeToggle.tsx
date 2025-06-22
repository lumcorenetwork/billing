import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "var(--color-primary)",
        color: "var(--color-text)",
        border: "none",
        borderRadius: "8px",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        margin: "1rem",
      }}
      aria-label="Toggle light and dark mode"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
