import Image from "next/image";
import Link from "next/link";
import Greeting from "@/components/greeting";
import HoverPreview from "@/components/hover-preview";
import SocialCard from "@/components/social-card";
import { SOCIAL_PROFILES } from "@/lib/social-profiles";
import { getAllProjects, type ProjectMeta } from "@/lib/content";
import { cn } from "@/lib/utils";
import { CustomKeyboard } from "@/components/ui/custom-keyboard";
import { AiImageCard } from "@/components/ui/ai-image-card";
import { LoaderAnimation } from "@/components/ui/loader-animation";
import SearchBar from "@/components/ui/search-bar";

/* Local covers for projects whose markdown has no image field. */
const PROJECT_IMAGE_FALLBACKS: Record<string, string> = {
  bookmrk: "/projects/bookmrkit.avif",
  mechanicalkeyboard: "/projects/keyui.avif",
  tcxcommit: "/projects/tccommit.avif",
  pricetracker: "/projects/trackhatke.avif",
};

type Item = {
  name: string;
  date: string;
  href: string;
};

const PROJECTS: Item[] = [
  { name: "Bookmrk", date: "Building", href: "/projects/bookmrk" },
  { name: "Mechanical Keyboard", date: "Live", href: "/projects/mechanicalkeyboard" },
  { name: "tcxcommit", date: "Live", href: "/projects/tcxcommit" },
  { name: "Price Tracker", date: "Building", href: "/projects/pricetracker" },
  { name: "All projects", date: "↗", href: "/projects" },
];

const NOTES: Item[] = [
  {
    name: "Getting Started with Neovim and LazyVim",
    date: "Blog",
    href: "/blogs/lazyvim",
  },
  {
    name: "State Management in React: A Beginner's Guide",
    date: "Blog",
    href: "/blogs/react-state-management",
  },
  {
    name: "Animating Components in React with Framer Motion",
    date: "Blog",
    href: "/blogs/motion",
  },
  {
    name: "Routing in Next.js (App Router)",
    date: "Blog",
    href: "/blogs/approuter",
  },
];

const STACK = [
  {
    label: "Language",
    items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Shadcn", "Framer Motion", "GSAP", "Vite"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "Bun", "PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "Neovim", "LLMs"],
  },
  {
    label: "Design",
    items: ["Figma", "Photoshop"],
  },
];

const EXPERIENCE = [
  {
    company: "Zero Dimensions",
    website: "https://zerodimensions.in",
    role: "Frontend Developer Intern",
    period: "Jan 2025 – Jul 2025",
    summary:
      "Built and maintained web apps with HTML, CSS and JavaScript, shipped multiple client websites, and worked with cross-functional teams to deliver on time.",
    tech: ["HTML", "CSS", "JavaScript", "Figma", "Tailwind CSS"],
  },
];

const SOCIAL_LINKS = [
  {
    key: "github",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
  {
    key: "x",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
      </svg>
    ),
  },
  {
    key: "email",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 5.25A2.25 2.25 0 0 1 3.75 3h16.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 20.25 21H3.75a2.25 2.25 0 0 1-2.25-2.25V5.25Zm2.16-.25 7.36 6.04a1.6 1.6 0 0 0 1.96 0L20.34 5H3.66ZM20.5 7.1l-6.28 5.15a4.1 4.1 0 0 1-4.44 0L3.5 7.1v11.4h17V7.1Z" />
      </svg>
    ),
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="border-t border-[var(--hairline)] pt-4">
      <span className="text-[15px] text-[var(--muted)]">{children}</span>
    </div>
  );
}

function Row({
  item,
  preview,
}: {
  item: Item;
  /** Optional hover preview card content for the row's link */
  preview?: React.ReactNode;
}) {
  const external = item.href.startsWith("http");
  const cls = "row flex items-baseline justify-between py-1.5 text-[17px]";

  const inner = (
    <>
      <span className="link">{item.name}</span>
      <span className="text-[15px] text-[var(--muted)]">{item.date}</span>
    </>
  );

  const link = external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={item.href} className={cls}>
      {inner}
    </Link>
  );

  if (!preview) return link;

  return (
    <HoverPreview trigger={link} card={preview} width={280} wrapClassName="block" />
  );
}

/** Hover preview card for a project row: cover image, title, live status. */
function ProjectPreview({ project }: { project: ProjectMeta }) {
  const image =
    project.image ?? PROJECT_IMAGE_FALLBACKS[project.slug] ?? null;
  const title = project.title.split(":")[0].trim();
  const status = project.status ?? project.timeline ?? null;

  return (
    <Link href={`/projects/${project.slug}`} className="block">
      {image && (
        <span className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[var(--hairline)]">
          <Image
            src={image}
            alt=""
            fill
            sizes="280px"
            className="object-cover"
          />
        </span>
      )}
      <span className="block px-4 py-3">
        <span className="flex items-baseline justify-between gap-3">
          <span className="truncate text-[13.5px] font-medium text-[var(--foreground)]">
            {title}
          </span>
          {status && (
            <span className="shrink-0 text-[12px] text-[var(--muted)]">
              {status}
            </span>
          )}
        </span>
        <span className="mt-1 line-clamp-2 block text-[12.5px] leading-5 text-[var(--muted)]">
          {project.description}
        </span>
      </span>
    </Link>
  );
}

/** Live playground component tile on the home page: demo + caption row. */
function PlaygroundTile({
  name,
  tags,
  href,
  className,
  children,
}: {
  name: string;
  tags: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn("group/ptile block", className)}>
      <span className="flex items-center justify-center overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--surface)] px-4 py-4">
        {children}
      </span>
      <span className="mt-2.5 flex items-baseline justify-between text-[15px]">
        <span className="text-[var(--foreground)] underline-offset-4 group-hover/ptile:underline">
          {name}
        </span>
        <span className="text-[var(--muted)]">{tags}</span>
      </span>
    </Link>
  );
}

function Experience() {
  return (
    <section className="rise mt-8" style={{ animationDelay: "200ms" }}>
      <SectionLabel>Experience</SectionLabel>
      <div className="mt-3">
        {EXPERIENCE.map((exp) => (
          <div key={exp.company} className="py-1.5">
            <div className="flex items-baseline justify-between">
              <div>
                <a
                  className="text-[17px] text-[var(--foreground)]"
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="link">{exp.company}</span>
                </a>
                <span className="text-[var(--muted)]"> · {exp.role}</span>
              </div>
              <span className="text-[15px] text-[var(--muted)]">{exp.period}</span>
            </div>
            <p className="mt-1 text-[15px] leading-6 text-[var(--muted)]">{exp.summary}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {exp.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--hairline)] px-2.5 py-0.5 text-[12px] text-[var(--muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="rise mt-8" style={{ animationDelay: "360ms" }}>
      <SectionLabel>Stack</SectionLabel>
      <div className="mt-3 flex flex-col gap-3">
        {STACK.map((group) => (
          <div
            key={group.label}
            className="flex flex-col gap-1.5 sm:flex-row sm:gap-4"
          >
            <span className="w-28 shrink-0 text-[15px] text-[var(--muted)]">
              {group.label}
            </span>
            <span className="text-[15px] leading-6 text-[var(--foreground)]">
              {group.items.join(", ")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export const revalidate = 3600;

export default async function Home() {
  const projects = await getAllProjects();
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const preview = (slug: string) => {
    const p = bySlug.get(slug);
    return p ? <ProjectPreview key={p.slug} project={p} /> : null;
  };

  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <div className="w-full max-w-[600px]">
        {/* Avatar */}
        <div className="rise" style={{ animationDelay: "0ms" }}>
          <Image
            src="/avatar.avif"
            alt="Sahil Singh"
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-lg object-cover ring-1 ring-[var(--hairline)]"
          />
          <p className="mt-5 text-[15px] text-[var(--muted)]">
            Open for full-time &amp; freelance work
          </p>
        </div>

        {/* Intro */}
        <div
          className="rise mt-6 flex flex-col gap-4"
          style={{ animationDelay: "80ms" }}
        >
          <Greeting />
          <p className="text-[17px] leading-7 text-[var(--muted)]">
            I&apos;m <span className="hl">Sahil Singh</span>, a{" "}
            <span className="hl">Design Engineer</span> from Gujarat, India who
            ships with effort, care and taste.
          </p>
          <p className="text-[17px] leading-7 text-[var(--muted)]">
            I design and develop{" "}
            <span className="hl">immersive digital experiences</span> with
            React, TypeScript, Motion and GSAP, focused on interaction,
            storytelling and fluid UX. On the backend I build fast, scalable
            full-stack apps with Node.js, Bun, PostgreSQL and MongoDB.
          </p>
          <p className="text-[17px] leading-7 text-[var(--muted)]">
            Recents include{" "}
            <a
              className="link"
              href="https://bookmrkit.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bookmrk
            </a>
            , a privacy-first bookmark manager, the{" "}
            <a
              className="link"
              href="https://github.com/sahilcodexx/MechanicalKeyboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mechanical Keyboard
            </a>{" "}
            simulator, and{" "}
            <a
              className="link"
              href="https://github.com/sahilcodexx/tcxcommit"
              target="_blank"
              rel="noopener noreferrer"
            >
              tcxcommit
            </a>
            , an AI commit generator{" "}
            <a
              className="link"
              href="https://github.com/sahilcodexx"
              target="_blank"
              rel="noopener noreferrer"
            >
              and more
            </a>
            .
          </p>
          <p className="text-[17px] leading-7 text-[var(--muted)]">
            Explore my{" "}
            <a className="link" href="#projects">
              Selected work
            </a>
            .
          </p>
        </div>

        {/* Experience: who I have worked with, right after the intro */}
        <Experience />

        {/* Projects */}
        <section
          id="projects"
          className="rise mt-10"
          style={{ animationDelay: "240ms" }}
        >
          <SectionLabel>Projects</SectionLabel>
          <div className="row-list mt-2">
            {PROJECTS.map((item) => (
              <Row
                key={item.name}
                item={item}
                preview={item.href.startsWith("/projects/") ? preview(item.href.replace("/projects/", "")) : null}
              />
            ))}
          </div>
        </section>

        {/* Playground: live components so recruiters can see them at a glance */}
        <section className="rise mt-8" style={{ animationDelay: "280ms" }}>
          <SectionLabel>Playground</SectionLabel>
          <div className="mt-4 grid grid-cols-1 items-start gap-x-5 gap-y-6 sm:grid-cols-2">
            <PlaygroundTile
              name="Mac Keyboard"
              tags="Interactive · Sound"
              href="/playground/mac-keyboard"
              className="sm:col-span-2"
            >
              <CustomKeyboard className="w-full" showPreview={false} />
            </PlaygroundTile>

            <PlaygroundTile
              name="Image Generation Card"
              tags="UI · Animation"
              href="/playground/image-generation-card"
            >
              <AiImageCard />
            </PlaygroundTile>

            <PlaygroundTile
              name="Hello Page Loader"
              tags="Animation · UI"
              href="/playground/page-loader"
            >
              <LoaderAnimation className="w-full aspect-square" />
            </PlaygroundTile>

            <PlaygroundTile
              name="Search Bar"
              tags="Interactive · UI"
              href="/playground/search-bar"
              className="sm:col-span-2"
            >
              <SearchBar className="w-full py-10" />
            </PlaygroundTile>
          </div>
          <p className="mt-3 text-[15px] text-[var(--muted)]">
            All components run live on this site ·{" "}
            <Link className="link" href="/playground">
              View all
            </Link>
          </p>
        </section>

        {/* Stack: the tools behind the work above */}
        <Stack />

        {/* Notes */}
        <section className="rise mt-8" style={{ animationDelay: "400ms" }}>
          <SectionLabel>Notes</SectionLabel>
          <div className="row-list mt-2">
            {NOTES.map((item) => (
              <Row key={item.name} item={item} />
            ))}
          </div>
        </section>

        {/* Connect */}
        <section className="rise mt-8" style={{ animationDelay: "440ms" }}>
          <SectionLabel>Connect</SectionLabel>
          <p className="mt-4 text-[17px] leading-7 text-[var(--muted)]">
            Open for <span className="hl">full-time roles</span> and{" "}
            <span className="hl">freelance work</span>. The best way to reach me
            is on{" "}
            <a
              className="link"
              href="https://www.linkedin.com/in/sahil-singh-tech/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            . You can also email me at{" "}
            <a className="link" href="mailto:sahil207003@gmail.com">
              sahil207003@gmail.com
            </a>{" "}
            or follow me on{" "}
            <a
              className="link"
              href="https://x.com/sahilcodex"
              target="_blank"
              rel="noopener noreferrer"
            >
              X (Twitter)
            </a>
            .
          </p>
          <p className="mt-5 text-[15px] text-[var(--muted)] opacity-60">
            Gujarat, India · IST
          </p>

          {/* Social links, each revealing a profile card on hover */}
          <div className="mt-5 flex items-center gap-2">
            {SOCIAL_LINKS.map((s) => (
              <SocialCard
                key={s.key}
                profile={SOCIAL_PROFILES[s.key]}
                icon={s.icon}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--muted)] transition hover:border-[color-mix(in_srgb,var(--foreground)_25%,transparent)] hover:text-[var(--foreground)]"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
