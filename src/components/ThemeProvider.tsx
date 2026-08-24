"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "mr-theme";

interface ThemeContextValue {
  theme: Theme;
  /** False until the client has read the real theme off <html>. */
  mounted: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Runs before first paint to stamp data-theme on <html>, so a reload into
 * light mode never flashes the dark background. Kept in sync with
 * ThemeProvider's own resolution order: stored choice, then system.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always "dark" on the server so markup matches; the init script has
  // already painted the correct theme by the time this hydrates.
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(readTheme());
    setMounted(true);
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement;

    // Crossfade the swap, but skip it under reduced motion.
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (animate) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 400);
    }

    root.setAttribute("data-theme", next);
    setThemeState(next);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode / storage disabled — the theme still applies for
      // this page view, it just won't be remembered.
    }
  }, []);

  // Follow the OS only while the visitor hasn't made an explicit choice.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");

    const handleChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored === "light" || stored === "dark") return;

      const next: Theme = event.matches ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      setThemeState(next);
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      mounted,
      setTheme: applyTheme,
      toggleTheme: () => applyTheme(readTheme() === "dark" ? "light" : "dark"),
    }),
    [theme, mounted, applyTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
