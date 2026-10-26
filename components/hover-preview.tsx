"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type HoverPreviewProps = {
  /** The visible element that stays in place (the trigger) */
  trigger: React.ReactNode;
  /** The preview card content, rendered in a portal on <body> */
  card: React.ReactNode;
  /** Card width in px */
  width?: number;
  /** Classes for the wrapper span, e.g. "block" for full-width rows */
  wrapClassName?: string;
};

/**
 * Shared hover-preview shell: shows `card` above `trigger` while hovered or
 * focused. The card is portaled to <body> because `.rise` sections keep a
 * transform after their entrance animation, which traps positioned children
 * inside the section's coordinate system; inside the portal it is positioned
 * in document coordinates, so scrolling simply moves card and trigger together.
 */
export default function HoverPreview({
  trigger,
  card,
  width = 290,
  wrapClassName = "inline-flex",
}: HoverPreviewProps) {
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState<{
    left: number;
    top: number;
    /** Card opens downwards instead of above the trigger */
    below: boolean;
  } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  /* Measure once the card is mounted (layout effect: before first paint) and
     whenever it re-opens or the window resizes. Places in document coords:
     absolute for a body child is relative to the initial containing block.
     Horizontal: at the pointer's X when it entered, so the card opens right
     under the cursor rather than centered over the whole row. */
  const pointerX = useRef<number | null>(null);
  const measure = useCallback(() => {
    const el = triggerRef.current;
    const cardEl = cardRef.current;
    if (!el || !cardEl) return;
    const rect = el.getBoundingClientRect();
    const height = cardEl.offsetHeight;
    const fitsAbove = height <= rect.top - 12;
    const fitsBelow = height <= window.innerHeight - rect.bottom - 12;
    const below = !fitsAbove && fitsBelow;
    const x = pointerX.current ?? rect.left + rect.width / 2;
    const left = Math.min(
      Math.max(x - width / 2, 12),
      Math.max(document.documentElement.clientWidth - width - 12, 12)
    );
    const top = below
      ? rect.bottom + window.scrollY + 12
      : rect.top + window.scrollY - height - 12;
    setPlace({ left, top, below });
  }, [width]);

  useLayoutEffect(() => {
    if (open) measure();
  }, [open, measure]);

  // Window resizes reflow the trigger; scrolling needs nothing (doc coords).
  useEffect(() => {
    if (!open) return;
    const reread = () => measure();
    window.addEventListener("resize", reread);
    return () => window.removeEventListener("resize", reread);
  }, [open, measure]);

  const show = (x: number | null) => {
    pointerX.current = x;
    setOpen(true);
  };

  // Focus moving to the card's own links (portaled, outside this DOM tree)
  // must not close it.
  const blurFrom = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (
      next &&
      (triggerRef.current?.contains(next) || cardRef.current?.contains(next))
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <span
        ref={triggerRef}
        className={wrapClassName}
        onMouseEnter={(e) => show(e.clientX)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => show(null)}
        onBlur={blurFrom}
      >
        {trigger}
      </span>

      {/* The portal only carries content once open, so SSR (open=false)
          renders nothing and hydration stays clean. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.span
                ref={cardRef}
                role="tooltip"
                /* Offscreen until the measuring pass corrects the position —
                   that correction flushes before the first paint. */
                className="absolute left-[-9999px]"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 8,
                  scale: 0.96,
                  transition: { duration: 0.12, ease: "easeOut" },
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 32, mass: 0.6 }
                }
                style={{
                  left: place?.left ?? -9999,
                  top: place?.top ?? -9999,
                  width,
                }}
              >
                <span className="block overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)]">
                  {card}
                </span>
              </motion.span>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
