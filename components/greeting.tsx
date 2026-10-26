"use client";

import { useSyncExternalStore } from "react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "good morning";
  if (hour >= 12 && hour < 17) return "good afternoon";
  if (hour >= 17 && hour < 22) return "good evening";
  return "good night";
}

/* The greeting depends on the clock, so it can change while the page is open.
   Subscribe to a minute tick to refresh it, and use the same snapshot on the
   server so the two agree at render time. */
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

export default function Greeting() {
  const greeting = useSyncExternalStore(
    subscribe,
    getGreeting,
    getGreeting
  );

  return (
    <p className="text-[17px] leading-7 text-[var(--muted)]">
      {greeting}, <span>こんにちは</span>, <span>નમસ્તે</span>
    </p>
  );
}
