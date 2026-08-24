"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative grid h-9 w-9 place-items-center rounded-md border border-accent-primary/30 text-accent-primary transition-colors duration-300 hover:border-accent-primary/70 hover:bg-accent-primary/5 ${className}`}
      // Before mount the icon is a placeholder, so keep it out of the
      // a11y tree rather than announcing the wrong action.
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      aria-pressed={mounted ? !isDark : undefined}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : undefined}
    >
      {/* Rendered only after mount: the server can't know the real theme,
          and guessing would hydrate the wrong icon. */}
      <span
        className="relative block h-[18px] w-[18px]"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 h-full w-full"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -70,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-hidden="true"
        >
          {/* Moon — shown while dark is active */}
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>

        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 h-full w-full"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 70 : 0,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-hidden="true"
        >
          {/* Sun — shown while light is active */}
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </motion.svg>
      </span>
    </button>
  );
}
