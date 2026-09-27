"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { cn } from "@/lib/utils";

const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const SIZE_SPRING = { type: "spring", bounce: 0.16, duration: 0.5 } as const;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/playground", label: "Playground" },
  { href: "/blogs", label: "Notes" },
];

function labelForPath(pathname: string): string {
  if (pathname === "/") return "Home";
  const match = NAV_ITEMS.find(
    (i) => i.href !== "/" && pathname.startsWith(i.href)
  );
  return match?.label ?? "Menu";
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

type Size = { width: number; height: number };

export default function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const isArticle =
    pathname.startsWith("/blogs/") || pathname.startsWith("/projects/");
  const showBack = pathname !== "/" && !isArticle;

  const [open, setOpen] = React.useState(false);
  const [collapsedSize, setCollapsedSize] = React.useState<Size>();
  const [openSize, setOpenSize] = React.useState<Size>();

  const collapsedRef = React.useRef<HTMLDivElement>(null);
  const openRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const measure = () => {
      if (collapsedRef.current)
        setCollapsedSize({
          width: collapsedRef.current.offsetWidth,
          height: collapsedRef.current.offsetHeight,
        });
      if (openRef.current)
        setOpenSize({
          width: openRef.current.offsetWidth,
          height: openRef.current.offsetHeight,
        });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (collapsedRef.current) ro.observe(collapsedRef.current);
    if (openRef.current) ro.observe(openRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the menu on navigation
  React.useEffect(() => setOpen(false), [pathname]);

  const goBack = () => {
    if (window.history.length > 1 && document.referrer !== "") router.back();
    else router.push("/");
  };

  const size = open ? openSize : collapsedSize;
  const radius = open ? 22 : (collapsedSize?.height ?? 40) / 2;

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/sahilcodexx",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sahil-singh-tech/",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
        </svg>
      ),
    },
    {
      label: "X",
      href: "https://x.com/sahilcodex",
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:sahil207003@gmail.com",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 5.25A2.25 2.25 0 0 1 3.75 3h16.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 20.25 21H3.75a2.25 2.25 0 0 1-2.25-2.25V5.25Zm2.16-.25 7.36 6.04a1.6 1.6 0 0 0 1.96 0L20.34 5H3.66ZM20.5 7.1l-6.28 5.15a4.1 4.1 0 0 1-4.44 0L3.5 7.1v11.4h17V7.1Z" />
        </svg>
      ),
    },
  ];

  /* ---------------- Expanded menu content ---------------- */
  const menuContent = (
    <motion.div
      key="menu"
      className="absolute inset-0 flex flex-col p-1.5"
      initial={{ opacity: 0, filter: reduceMotion ? undefined : "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: reduceMotion ? undefined : "blur(4px)" }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
    >
      <div className="flex flex-col">
        {NAV_ITEMS.map((item, i) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-[14px] px-3 py-2 text-sm font-medium leading-none transition-colors",
                active
                  ? "text-foreground"
                  : "text-foreground/55 hover:text-foreground/85"
              )}
              style={{
                transitionDelay: reduceMotion ? "0ms" : `${i * 20}ms`,
              }}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  active ? "bg-foreground" : "bg-foreground/25"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="mx-3 my-1.5 h-px bg-[var(--hairline)]" />

      <div className="flex items-center justify-between px-2 pb-0.5 pt-0.5">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={s.label}
            className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/50 transition hover:bg-foreground/10 hover:text-foreground"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </motion.div>
  );

  /* ---------------- Collapsed pill content ---------------- */
  const collapsedContent = (
    <motion.button
      key="pill"
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open menu"
      className="absolute inset-0 flex items-center gap-2.5 px-4"
      initial={{ opacity: 0, filter: reduceMotion ? undefined : "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: reduceMotion ? undefined : "blur(4px)" }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span className="whitespace-nowrap text-sm font-medium leading-none text-foreground">
        {labelForPath(pathname)}
      </span>
    </motion.button>
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed z-50",
        isArticle ? "bottom-5 right-5" : "bottom-5 left-1/2 -translate-x-1/2"
      )}
    >
      <div className="relative flex items-center gap-2.5">
        {/* Nav pill on the left, back on the right */}
        {/* Hidden measurers — must mirror the real collapsed content exactly */}
        <div className="pointer-events-none invisible absolute" aria-hidden>
          <div ref={collapsedRef} className="inline-flex h-9 items-center gap-2.5 px-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="whitespace-nowrap text-sm font-medium leading-none">
              {labelForPath(pathname)}
            </span>
          </div>
          <div ref={openRef} className="w-56 p-1.5">
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <div key={item.href} className="flex items-center gap-3 px-3 py-2 text-sm font-medium leading-none">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" />
                  {item.label}
                </div>
              ))}
            </div>
            <div className="mx-3 my-1.5 h-px" />
            <div className="flex items-center justify-between px-2 py-0.5">
              {socials.map((s) => (
                <span key={s.label} className="h-8 w-8" />
              ))}
            </div>
          </div>
        </div>

        {/* Animated surface */}
        {size && (
          <motion.div
            data-slot="site-nav-surface"
            className={cn(
              "dock relative overflow-hidden rounded-full",
              open && "rounded-[22px]"
            )}
            initial={false}
            animate={{
              width: size.width,
              height: size.height,
              borderRadius: radius,
            }}
            transition={reduceMotion ? { duration: 0 } : SIZE_SPRING}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {open ? menuContent : collapsedContent}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Back button on the right (not on home, not on articles) */}
        {showBack && !open && (
          <motion.button
            type="button"
            onClick={goBack}
            aria-label="Go back"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduceMotion ? { duration: 0 } : { ...SIZE_SPRING, delay: 0.05 }
            }
            className="dock flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[12px] font-medium leading-none text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            back
          </motion.button>
        )}

      </div>
    </div>
  );
}
