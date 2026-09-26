"use client";

import { useState } from "react";

type Tab = { label: string; html: string };

export default function CodeShell({
  html,
  tabs,
}: {
  html: string;
  tabs?: Tab[];
}) {
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const active = tabs && tabs.length > 1 ? tabs[idx] : null;
  const shownHtml = active ? active.html : html;

  async function copy() {
    try {
      // Strip tags to copy raw code text
      const tmp = document.createElement("div");
      tmp.innerHTML = shownHtml;
      await navigator.clipboard.writeText(tmp.textContent ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div>
      {active && (
        <div className="mb-2 flex items-center gap-1">
          {tabs!.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setIdx(i)}
              className={`rounded-full px-3 py-1 text-[13px] transition-colors ${
                idx === i
                  ? "bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
      <div className="code-shell relative">
        <button
          onClick={copy}
          aria-label="Copy code"
          className="absolute right-3 top-3 z-10 text-[var(--muted)] transition hover:text-[var(--foreground)]"
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
        <div
          className="typeset typeset-docs max-w-none [&_pre]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: shownHtml }}
        />
      </div>
    </div>
  );
}
