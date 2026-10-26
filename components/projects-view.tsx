"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";

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

const VIEWS = ["list", "grid"] as const;
type View = (typeof VIEWS)[number];

const VIEW_KEY = "projects-view";

/* View preference, mirrored into sessionStorage so it survives navigation.
   Read through useSyncExternalStore to keep it out of an effect. */
let cachedView: View | null = null;
const listeners = new Set<() => void>();

function isView(value: string | null): value is View {
  return value === "list" || value === "grid";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): View {
  if (cachedView) return cachedView;
  const saved = window.sessionStorage.getItem(VIEW_KEY);
  cachedView = isView(saved) ? saved : "list";
  return cachedView;
}

function getServerSnapshot(): View {
  return "list";
}

function setView(next: View) {
  cachedView = next;
  window.sessionStorage.setItem(VIEW_KEY, next);
  listeners.forEach((notify) => notify());
}

function ListView({ projects }: { projects: ProjectCard[] }) {
  return (
    <div className="row-list mt-6">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          className="row flex items-baseline justify-between py-1.5 text-[17px]"
        >
          <span className="link">{p.title}</span>
          <span className="text-[15px] text-[var(--muted)]">{p.status}</span>
        </Link>
      ))}
    </div>
  );
}

function GridView({ projects }: { projects: ProjectCard[] }) {
  return (
    <div className="group/list mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {projects.map((p) => (
        <div
          key={p.slug}
          className="group/card flex flex-col rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3.5 transition-all duration-300 group-hover/list:opacity-40 hover:border-[color-mix(in_srgb,var(--foreground)_18%,transparent)] hover:opacity-100!"
        >
          <Link
            href={`/projects/${p.slug}`}
            className="relative block aspect-[16/10] overflow-hidden rounded-lg"
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              className="object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
            />
          </Link>

          <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3.5">
            <h3 className="text-base font-medium leading-snug text-[var(--foreground)]">
              {p.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-6 text-[var(--muted)]">
              {p.description}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <Link
                href={`/projects/${p.slug}`}
                className="rounded-full border border-[var(--hairline)] px-3.5 py-1 text-[15px] text-[var(--foreground)] transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--foreground)_25%,transparent)]"
              >
                View
              </Link>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-[13.5px] text-[var(--muted)] transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--foreground)] after:transition-transform after:duration-300 hover:text-[var(--foreground)] hover:after:scale-x-100"
                >
                  Live
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
  const view = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-[var(--foreground)]">
            Projects
          </h1>
          <p className="mt-2 text-[17px] leading-7 text-[var(--muted)]">
            Things I have designed and built.
          </p>
        </div>

        {/* View toggle, aligned with the heading */}
        <div className="dock mt-1 flex items-center gap-0.5 rounded-full p-1">
          {VIEWS.map((v) => (
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
