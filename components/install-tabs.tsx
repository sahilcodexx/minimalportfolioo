"use client";

import { useState } from "react";

const PMs = ["bun", "npm", "pnpm", "yarn"] as const;
type PM = (typeof PMs)[number];

const cliCmd: Record<PM, string> = {
  bun: "bunx --bun shadcn@latest add",
  npm: "npx shadcn@latest add",
  pnpm: "pnpm dlx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
};

const addCmd: Record<PM, string> = {
  bun: "bun add",
  npm: "npm install",
  pnpm: "pnpm add",
  yarn: "yarn add",
};

type ManualStep = { label: string; file: string; html: string };

export default function InstallTabs({
  cli,
  deps,
  manualSteps,
}: {
  cli: string;
  deps: string[];
  manualSteps: ManualStep[];
}) {
  const [tab, setTab] = useState<"cli" | "manual">("cli");
  const [pm, setPm] = useState<PM>("bun");
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  }

  function CopyBtn({ text, k }: { text: string; k: string }) {
    return (
      <button
        onClick={() => copy(text, k)}
        aria-label="Copy"
        className="shrink-0 text-[var(--muted)] transition hover:text-[var(--foreground)]"
      >
        {copied === k ? (
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
    );
  }

  return (
    <div>
      <div className="flex items-center gap-1">
        {(["cli", "manual"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-medium capitalize transition-colors ${
              tab === t
                ? "bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "cli" ? (
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-1 border-b border-[var(--hairline)] pb-2">
            {PMs.map((p) => (
              <button
                key={p}
                onClick={() => setPm(p)}
                className={`rounded-full px-3 py-1 text-[13px] transition-colors ${
                  pm === p
                    ? "bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div>
            <p className="mb-1.5 text-[13px] text-[var(--muted)]">CLI</p>
            <div className="code-shell flex items-center justify-between gap-3">
              <code className="overflow-x-auto whitespace-nowrap font-mono text-[13px] text-[var(--foreground)]">
                {cliCmd[pm]} &quot;{cli}&quot;
              </code>
              <CopyBtn text={`${cliCmd[pm]} "${cli}"`} k="cli" />
            </div>
          </div>

          {deps.length > 0 && (
            <div>
              <p className="mb-1.5 text-[13px] text-[var(--muted)]">Dependencies</p>
              <div className="code-shell flex items-center justify-between gap-3">
                <code className="overflow-x-auto whitespace-nowrap font-mono text-[13px] text-[var(--foreground)]">
                  {addCmd[pm]} {deps.join(" ")}
                </code>
                <CopyBtn text={`${addCmd[pm]} ${deps.join(" ")}`} k="deps" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-5">
          <div>
            <p className="mb-1.5 text-[13px] text-[var(--muted)]">
              1. Install dependencies
            </p>
            <div className="code-shell flex items-center justify-between gap-3">
              <code className="overflow-x-auto whitespace-nowrap font-mono text-[13px] text-[var(--foreground)]">
                {addCmd[pm]} {deps.join(" ")}
              </code>
              <CopyBtn text={`${addCmd[pm]} ${deps.join(" ")}`} k="m-deps" />
            </div>
          </div>
          {manualSteps.map((s, i) => (
            <div key={s.file}>
              <p className="mb-1.5 text-[13px] text-[var(--muted)]">
                {i + 2}. Copy the source into{" "}
                <span className="font-mono text-[var(--foreground)]">{s.file}</span>
              </p>
              <div className="code-shell relative max-h-96 overflow-auto">
                <div className="absolute right-3 top-3 z-10">
                  <CopyBtn text={s.html.replace(/<[^>]*>/g, "")} k={`m-${i}`} />
                </div>
                <div
                  className="typeset typeset-docs max-w-none [&_pre]:!bg-transparent"
                  dangerouslySetInnerHTML={{ __html: s.html }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
