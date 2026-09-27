"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type ProjectCard = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  status: string;
  technologies: string[];
  github?: string;
  live?: string;
};

function statusColor(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("build") || s.includes("develop")) return "bg-amber-400";
  if (s.includes("live") || s.includes("complete")) return "bg-emerald-400";
  return "bg-zinc-400";
}

function ListView({ projects }: { projects: ProjectCard[] }) {
  return (
    <div className="row-list mt-6">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          className="row flex items-baseline justify-between py-1.5 text-[15px]"
        >
          <span className="link">{p.title}</span>
          <span className="text-[13px] text-[var(--muted)]">{p.status}</span>
        </Link>
      ))}
    </div>
  );
}

function GridView({ projects }: { projects: ProjectCard[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {projects.map((p) => (
        <div
          key={p.slug}
          className="project-card flex flex-col overflow-hidden rounded-2xl"
        >
          <Link href={`/projects/${p.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </Link>

          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-baseline justify-between gap-2">
              <Link href={`/projects/${p.slug}`}>
                <h3 className="text-[15px] font-semibold leading-tight text-[var(--foreground)]">
                  {p.title}
                </h3>
              </Link>
              <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-[var(--muted)]">
                <span className={`h-1.5 w-1.5 rounded-full ${statusColor(p.status)}`} />
                {p.status}
              </span>
            </div>

            <p className="mt-0.5 text-[13px] text-[var(--muted)]">{p.subtitle}</p>
            <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[var(--muted)]">
              {p.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.technologies.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-[var(--hairline)] px-2 py-0.5 text-[11px] text-[var(--muted)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 flex border-t border-[var(--hairline)] pt-3 text-[13px]">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 text-[var(--foreground)] transition hover:opacity-70"
                >
                  Live link
                </a>
              )}
              {p.live && p.github && <span className="w-px bg-[var(--hairline)]" />}
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 text-[var(--foreground)] transition hover:opacity-70"
                >
                  GitHub
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectsView({ projects }: { projects: ProjectCard[] }) {
  const [view, setView] = useState<"list" | "grid">("list");
  const pathname = usePathname();

  // Remember the choice for the session
  useEffect(() => {
    const saved = window.sessionStorage.getItem("projects-view");
    if (saved === "grid" || saved === "list") setView(saved);
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("projects-view", view);
  }, [view]);

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-[var(--foreground)]">
            Projects
          </h1>
          <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">
            Things I have designed and built.
          </p>
        </div>

        {/* View toggle, aligned with the heading */}
        <div className="dock mt-1 flex items-center gap-0.5 rounded-full p-1">
          {(["list", "grid"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-label={`${v} view`}
              title={`${v} view`}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                view === v
                  ? "bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)] text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {v === "list" ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <ListView projects={projects} />
      ) : (
        <GridView projects={projects} />
      )}
    </>
  );
}
