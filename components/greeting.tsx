"use client";

import { useEffect, useState } from "react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "good morning";
  if (hour >= 12 && hour < 17) return "good afternoon";
  if (hour >= 17 && hour < 22) return "good evening";
  return "good night";
}

export default function Greeting() {
  const [greeting, setGreeting] = useState("hello");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <p className="text-[15px] leading-7 text-[var(--muted)]">
      {greeting}, <span>こんにちは</span>, <span>નમસ્તે</span>
    </p>
  );
}
