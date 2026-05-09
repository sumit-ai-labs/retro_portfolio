"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { isEvening, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      id="themeToggle"
      className="theme-toggle mag-target"
      type="button"
      aria-label={mounted ? (isEvening ? "Toggle Morning Edition" : "Toggle Evening Edition") : "Toggle Edition"}
      onClick={toggleTheme}
    >
      Theme: {mounted ? (isEvening ? "Dark" : "Light") : "Dark"}
    </button>
  );
}
