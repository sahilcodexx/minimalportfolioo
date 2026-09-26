"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ScrollProgress, type ScrollProgressSection } from "@/components/ui/scroll-progress";

export default function ArticleScrollProgress({
  sections,
}: {
  sections: ScrollProgressSection[];
}) {
  const [pillWidth, setPillWidth] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  // Remove the social dock on article pages: back pill + progress pill replace it
  useEffect(() => {
    const dock = document.querySelector<HTMLDivElement>("[data-slot='social-dock']");
    if (dock) dock.style.display = "none";
    return () => {
      if (dock) dock.style.display = "";
    };
  }, []);

  // Track the progress pill's rendered width so the back pill sits flush beside it.
  // The surface mounts after the component's own measuring pass, so retry until it exists.
  useEffect(() => {
    let ro: ResizeObserver | undefined;
    let cancelled = false;

    const tryObserve = () => {
      if (cancelled) return;
      const surface = document.querySelector<HTMLElement>(
        "[data-slot='scroll-progress-surface']"
      );
      if (surface) {
        const update = () => setPillWidth(surface.offsetWidth);
        update();
        ro = new ResizeObserver(update);
        ro.observe(surface);
      } else {
        requestAnimationFrame(tryObserve);
      }
    };

    tryObserve();
    return () => {
      cancelled = true;
      ro?.disconnect();
    };
  }, []);

  if (!sections.length) return null;

  const offset = pillWidth !== null ? pillWidth / 2 + 10 : null;

  return (
    <>
      <ScrollProgress sections={sections} />

      {/* Back pill: anchored to page center, spring-eased to hug the navbar's right edge */}
      <motion.div
        className="fixed bottom-6 left-1/2 z-50"
        initial={false}
        animate={{
          x: offset ?? 90,
          opacity: offset !== null ? 1 : 0,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                x: { type: "spring", stiffness: 320, damping: 30, mass: 0.7 },
                opacity: { duration: 0.2 },
              }
        }
      >
        <button
          type="button"
          onClick={() =>
            window.history.length > 1 && document.referrer !== ""
              ? history.back()
              : (window.location.href = "/")
          }
          aria-label="Go back"
          className="back-fab flex h-8 items-center gap-2 rounded-full px-3.5 [corner-shape:squircle]"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="text-[13px] font-medium leading-none">back</span>
        </button>
      </motion.div>
    </>
  );
}
