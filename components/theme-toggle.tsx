"use client";

import { useSyncExternalStore } from "react";

/* The theme class lives on <html>, so the toggle reads it from the DOM. The
   server snapshot is false so the button renders the sun icon before mount. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("light");
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const isLight = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  function toggle() {
    const next = !isLight;
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={isLight ? "Switch to dark" : "Switch to light"}
      className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition hover:text-[var(--foreground)]"
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}
