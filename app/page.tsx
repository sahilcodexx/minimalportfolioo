import Image from "next/image";
import Link from "next/link";
import Greeting from "@/components/greeting";

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

const PLAYGROUND: Item[] = [
  {
    name: "Mac Keyboard",
    date: "Interactive",
    href: "/playground/mac-keyboard",
  },
  {
    name: "Image Generation Card",
    date: "Animation",
    href: "/playground/image-generation-card",
  },
  {
    name: "Hello Page Loader",
    date: "Motion",
    href: "/playground/page-loader",
  },
  {
    name: "Search Bar",
    date: "Interactive",
    href: "/playground/search-bar",
  },
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

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="border-t border-[var(--hairline)] pt-4">
      <span className="text-[13px] text-[var(--muted)]">{children}</span>
    </div>
  );
}

function Row({ item }: { item: Item }) {
  const external = item.href.startsWith("http");
  const cls = "row flex items-baseline justify-between py-1.5 text-[15px]";

  const inner = (
    <>
      <span className="link">{item.name}</span>
      <span className="text-[13px] text-[var(--muted)]">{item.date}</span>
    </>
  );

  return external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={item.href} className={cls}>
      {inner}
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
                  className="text-[15px] text-[var(--foreground)]"
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="link">{exp.company}</span>
                </a>
                <span className="text-[var(--muted)]"> · {exp.role}</span>
              </div>
              <span className="text-[13px] text-[var(--muted)]">{exp.period}</span>
            </div>
            <p className="mt-1 text-[14px] leading-6 text-[var(--muted)]">{exp.summary}</p>
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
            <span className="w-28 shrink-0 text-[13px] text-[var(--muted)]">
              {group.label}
            </span>
            <span className="text-[14px] leading-6 text-[var(--foreground)]">
              {group.items.join(", ")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <div className="w-full max-w-xl">
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
          <p className="mt-5 text-[13px] text-[var(--muted)]">
            Open for full-time &amp; freelance work
          </p>
        </div>

        {/* Intro */}
        <div
          className="rise mt-6 flex flex-col gap-4"
          style={{ animationDelay: "80ms" }}
        >
          <Greeting />
          <p className="text-[15px] leading-7 text-[var(--muted)]">
            I&apos;m <span className="hl">Sahil Singh</span>, a{" "}
            <span className="hl">Design Engineer</span> from Gujarat, India who
            ships with effort, care and taste.
          </p>
          <p className="text-[15px] leading-7 text-[var(--muted)]">
            I design and develop{" "}
            <span className="hl">immersive digital experiences</span> with
            React, TypeScript, Motion and GSAP, focused on interaction,
            storytelling and fluid UX. On the backend I build fast, scalable
            full-stack apps with Node.js, Bun, PostgreSQL and MongoDB.
          </p>
          <p className="text-[15px] leading-7 text-[var(--muted)]">
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
          <p className="text-[15px] leading-7 text-[var(--muted)]">
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
              <Row key={item.name} item={item} />
            ))}
          </div>
        </section>

        {/* Playground */}
        <section className="rise mt-8" style={{ animationDelay: "280ms" }}>
          <SectionLabel>Playground</SectionLabel>
          <div className="row-list mt-2">
            {PLAYGROUND.map((item) => (
              <Row key={item.name} item={item} />
            ))}
          </div>
          <p className="mt-3 text-[13px] text-[var(--muted)]">
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
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
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
          <p className="mt-5 text-[13px] text-[var(--muted)] opacity-60">
            Gujarat, India · IST
          </p>
        </section>
      </div>
    </main>
  );
}
