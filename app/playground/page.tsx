import Link from "next/link";

export const metadata = {
  title: "Playground — Sahil Singh",
  description: "Interactive components built with React, Motion and TypeScript.",
};

const COMPONENTS = [
  {
    name: "Mac Keyboard",
    desc: "Interactive Mac keyboard replica with real switch sounds and themes.",
    tags: "Interactive · Sound",
    href: "/playground/mac-keyboard",
  },
  {
    name: "Image Generation Card",
    desc: "AI image-generation state card with blinking grid and blur-to-focus reveal.",
    tags: "UI · Animation",
    href: "/playground/image-generation-card",
  },
  {
    name: "Hello Page Loader",
    desc: "Multilingual greeting loader. Each word fades into the next.",
    tags: "Animation · UI",
    href: "/playground/page-loader",
  },
  {
    name: "Search Bar",
    desc: "Command-palette style dropdown with keyboard navigation and match highlighting.",
    tags: "Interactive · UI",
    href: "/playground/search-bar",
  },
];

export default function PlaygroundPage() {
  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-medium tracking-tight text-[var(--foreground)]">
          Playground
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">
          Interactive components built with React, Motion and TypeScript.
        </p>

        <div className="row-list mt-8">
          {COMPONENTS.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="row flex items-baseline justify-between py-1.5 text-[15px]"
            >
              <span className="link">{c.name}</span>
              <span className="text-[13px] text-[var(--muted)]">{c.tags}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
