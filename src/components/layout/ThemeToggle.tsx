"use client";

import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "plethore-theme";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Basculer le mode clair / nuit"
      title="Basculer le mode clair / nuit"
      className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors duration-200 hover:bg-green-soft hover:text-green"
    >
      <Moon className="size-[19px] [html[data-theme=dark]_&]:hidden" aria-hidden="true" />
      <Sun className="hidden size-[19px] [html[data-theme=dark]_&]:block" aria-hidden="true" />
    </button>
  );
}
