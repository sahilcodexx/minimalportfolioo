"use client";

import Link from "next/link";
import Mascot from "./mascot";

// Enhanced 404 — kept ready for after video recording
// Activate by: import Four0Four from "@/components/four0four-enhanced" in app/not-found.tsx
export default function Four0FourEnhanced() {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[var(--background)] px-6 py-16">
      <div className="flex w-full max-w-xl flex-col items-center">
        {/* 4 - mascot - 4 */}
        <div
          className="rise flex items-center justify-center gap-0.5 sm:gap-2"
          style={{ animationDelay: "0ms" }}
        >
          <span className="select-none text-[88px] font-[650] leading-none tracking-[-0.06em] text-zinc-100 sm:text-[118px] md:text-[132px]">
            4
          </span>
          <div className="relative mx-[1px] flex items-center justify-center sm:mx-1">
            <Mascot className="h-[76px] w-[86px] translate-y-[3px] sm:h-[104px] sm:w-[118px] md:h-[116px] md:w-[132px]" />
          </div>
          <span className="select-none text-[88px] font-[650] leading-none tracking-[-0.06em] text-zinc-100 sm:text-[118px] md:text-[132px]">
            4
          </span>
        </div>

        <div
          className="rise mt-6 flex flex-col items-center gap-2 text-center sm:mt-8"
          style={{ animationDelay: "80ms" }}
        >
          <h1 className="text-[15px] font-medium tracking-[-0.01em] text-zinc-200">
            Page not found
          </h1>
          <p className="max-w-[31ch] text-balance text-[13.5px] leading-6 text-zinc-500">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>

        <div
          className="rise mt-8 flex items-center gap-3"
          style={{ animationDelay: "160ms" }}
        >
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-[13px] font-medium tracking-[-0.01em] text-black transition hover:bg-zinc-200 active:bg-zinc-300"
          >
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full bg-zinc-900 px-5 text-[13px] font-medium tracking-[-0.01em] text-zinc-300 ring-1 ring-white/10 transition hover:bg-zinc-800 hover:text-white active:bg-zinc-900"
          >
            Go back
          </button>
        </div>

        <div
          className="rise mt-10 flex items-center gap-2.5 sm:mt-12"
          style={{ animationDelay: "240ms" }}
        >
          <span className="h-px w-7 bg-[var(--hairline)]" aria-hidden />
          <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600">
            ERROR 404
          </span>
          <span className="h-px w-7 bg-[var(--hairline)]" aria-hidden />
        </div>
      </div>

      <p
        className="rise absolute bottom-6 text-center font-mono text-[11px] tracking-wide text-zinc-600 sm:bottom-8"
        style={{ animationDelay: "320ms" }}
      >
        sahilcodex — Gujarat, India
      </p>
    </section>
  );
}
