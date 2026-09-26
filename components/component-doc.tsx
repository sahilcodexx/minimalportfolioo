import type { ReactNode } from "react";
import CodeShell from "@/components/code-shell";
import InstallTabs from "@/components/install-tabs";

export type PropRow = {
  name: string;
  type: string;
  description: string;
};

export type ComponentDocProps = {
  title: string;
  description: string;
  preview: ReactNode;
  cli: string;
  deps: string[];
  manualSteps?: { label: string; file: string; code: string }[];
  usage: { label: string; code: string }[];
  props?: PropRow[];
  notes?: string;
};

/**
 * Server component: builds the doc page hierarchy. Code highlighting happens
 * on the server via the same shiki pipeline used for blogs.
 */
export default async function ComponentDoc({
  title,
  description,
  preview,
  cli,
  deps,
  manualSteps = [],
  usage,
  props,
  notes,
}: ComponentDocProps) {
  const highlightedUsage = await Promise.all(
    usage.map(async (u) => ({ ...u, html: await highlight(u.code) }))
  );
  const highlightedManual = await Promise.all(
    manualSteps.map(async (s) => ({ ...s, html: await highlight(s.code) }))
  );

  return (
    <div className="w-full">
      {/* Header */}
      <h1 className="text-2xl font-medium tracking-tight text-[var(--foreground)]">
        {title}
      </h1>
      <p className="mt-3 max-w-[60ch] text-[15px] leading-7 text-[var(--muted)]">
        {description}
      </p>

      {/* Preview canvas */}
      <div className="preview-canvas mt-6">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
          Preview
        </p>
        <div className="flex min-h-64 items-center justify-center">{preview}</div>
      </div>

      {/* Installation */}
      <section className="mt-12">
        <h2 className="text-lg font-medium tracking-tight text-[var(--foreground)]">
          Installation
        </h2>
        <p className="mt-1.5 text-[14px] leading-6 text-[var(--muted)]">
          Install component dependencies or run the automated CLI command.
        </p>

        <div className="mt-4">
          <InstallTabs cli={cli} deps={deps} manualSteps={highlightedManual} />
        </div>
      </section>

      {/* Usage */}
      <section className="mt-12">
        <h2 className="text-lg font-medium tracking-tight text-[var(--foreground)]">
          Usage
        </h2>
        <div className="mt-4">
          <CodeShell
            html={highlightedUsage[0]?.html ?? ""}
            tabs={highlightedUsage.map((u) => ({ label: u.label, html: u.html }))}
          />
        </div>
      </section>

      {/* Props */}
      {props && props.length > 0 && (
        <section className="mt-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
            Props
          </p>
          <p className="mt-2 text-[15px] leading-7 text-[var(--foreground)]">
            Options you can pass to customize this component.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  {"PROP,TYPE,DESCRIPTION".split(",").map((h) => (
                    <th
                      key={h}
                      className="border-b border-[var(--hairline)] pb-2 pr-6 font-mono text-[11px] font-normal uppercase tracking-widest text-[var(--muted)]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.map((p) => (
                  <tr key={p.name} className="border-b border-[var(--hairline)] last:border-0">
                    <td className="py-4 pr-6 align-top">
                      <code className="rounded-md border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)] px-2 py-1 font-mono text-[12px] text-[var(--foreground)]">
                        {p.name}
                      </code>
                    </td>
                    <td className="py-4 pr-6 align-top font-mono text-[13px] text-[var(--muted)]">
                      {p.type}
                    </td>
                    <td className="py-4 align-top text-[14px] leading-6 text-[var(--foreground)]">
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Notes */}
      {notes && (
        <section className="mt-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
            Keep in mind
          </p>
          <p className="mt-2 max-w-[60ch] text-[15px] leading-7 text-[var(--foreground)]">
            {notes}
          </p>
        </section>
      )}

      {/* Contact */}
      <section className="mt-12">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
          Contact
        </p>
        <p className="mt-2 text-[15px] leading-7 text-[var(--foreground)]">
          Found a bug or issue? Feel free to drop a DM.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <a
            href="mailto:sahil207003@gmail.com"
            aria-label="Email"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.5 5.25A2.25 2.25 0 0 1 3.75 3h16.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 20.25 21H3.75a2.25 2.25 0 0 1-2.25-2.25V5.25Zm2.16-.25 7.36 6.04a1.6 1.6 0 0 0 1.96 0L20.34 5H3.66ZM20.5 7.1l-6.28 5.15a4.1 4.1 0 0 1-4.44 0L3.5 7.1v11.4h17V7.1Z" />
            </svg>
          </a>
          <a
            href="https://x.com/sahilcodex"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

import { highlightCode } from "@/lib/markdown";
function highlight(code: string) {
  return highlightCode(code, "tsx");
}
