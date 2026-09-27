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
  const { highlightCode } = await import("@/lib/markdown");

  const highlightedUsage = await Promise.all(
    usage.map(async (u) => ({ ...u, html: await highlightCode(u.code, "tsx") }))
  );
  const highlightedManual = await Promise.all(
    manualSteps.map(async (s) => ({ ...s, html: await highlightCode(s.code, "tsx") }))
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
    </div>
  );
}
