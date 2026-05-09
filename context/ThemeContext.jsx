"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("evening");

  useEffect(() => {
    window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem("portfolio-edition");
      const nextTheme = stored === "morning" ? "morning" : "evening";
      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-edition", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isEvening: theme === "evening",
      toggleTheme: () => setTheme((current) => (current === "evening" ? "morning" : "evening"))
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
