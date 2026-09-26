import type { ReactNode } from "react";
import CodeShell from "@/components/code-shell";
import InstallTabs from "@/components/install-tabs";

export type ComponentDocProps = {
  title: string;
  description: string;
  preview: ReactNode;
  cli: string;
  deps: string[];
  manualSteps?: { label: string; file: string; code: string }[];
  usage: { label: string; code: string }[];
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
    </div>
  );
}

import { highlightCode } from "@/lib/markdown";
function highlight(code: string) {
  return highlightCode(code, "tsx");
}
