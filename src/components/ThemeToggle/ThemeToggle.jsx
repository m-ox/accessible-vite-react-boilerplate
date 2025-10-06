import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Switch } from "@radix-ui/themes";
import "./ThemeToggle.scss";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="theme-toggle">
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        color="indigo"
        radius="full"
      />
      <span className="theme-toggle__emoji" aria-hidden="true">
        {isDark ? "☀️" : "🌙"}
      </span>
    </div>
  );
};
