"use client";

import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";

export default function FloatingBack({
  fallback = "/",
  className = "bottom-5 left-5",
  style,
}: {
  fallback?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1 && document.referrer !== "") {
      router.back();
    } else {
      router.push(fallback);
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back"
      style={style}
      className={`back-fab fixed z-50 flex h-8 items-center gap-1.5 rounded-full px-3 ${className}`}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span className="text-[12px] leading-none">back</span>
    </button>
  );
}
