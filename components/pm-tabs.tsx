"use client";

import { useState } from "react";

const PMs = ["bun", "npm", "pnpm", "yarn"] as const;
type PM = (typeof PMs)[number];

const cmdFor: Record<PM, (pkg: string, cli: string) => string> = {
  bun: (p, c) => `bunx --bun shadcn@latest add "${c}"`,
  npm: (p, c) => `npx shadcn@latest add "${c}"`,
  pnpm: (p, c) => `pnpm dlx shadcn@latest add "${c}"`,
  yarn: (p, c) => `yarn dlx shadcn@latest add "${c}"`,
};

const depFor: Record<PM, (pkg: string) => string> = {
  bun: (p) => `bun add ${p}`,
  npm: (p) => `npm install ${p}`,
  pnpm: (p) => `pnpm add ${p}`,
  yarn: (p) => `yarn add ${p}`,
};

export default function PmTabs({ cli, deps }: { cli: string; deps: string[] }) {
  const [pm, setPm] = useState<PM>("bun");
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  }

  const rows: { key: string; label: string; cmd: string }[] = [
    { key: "cli", label: "CLI", cmd: cmdFor[pm]("", cli) },
    ...(deps.length
      ? [{ key: "deps", label: "Dependencies", cmd: depFor[pm](deps.join(" ")) }]
      : []),
  ];

  return (
    <div>
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

      <div className="mt-3 flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.key}>
            <p className="mb-1.5 text-[13px] text-[var(--muted)]">{row.label}</p>
            <div className="code-shell flex items-center justify-between gap-3">
              <code className="overflow-x-auto whitespace-nowrap font-mono text-[13px] text-[var(--foreground)]">
                {row.cmd}
              </code>
              <button
                onClick={() => copy(row.cmd, row.key)}
                aria-label={`Copy ${row.label} command`}
                className="shrink-0 text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {copied === row.key ? (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
