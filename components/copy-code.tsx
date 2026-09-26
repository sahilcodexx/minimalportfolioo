"use client";

import { useEffect } from "react";

/**
 * Adds copy buttons to all code blocks (rehype-pretty-code figures) inside the
 * article element. Runs once per article mount; uses direct DOM buttons on
 * server-rendered HTML.
 */
export default function CopyCode({ containerId }: { containerId: string }) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const buttons: HTMLButtonElement[] = [];
    const figures = container.querySelectorAll<HTMLElement>(
      "figure[data-rehype-pretty-code-figure]"
    );

    figures.forEach((figure) => {
      if (figure.querySelector(".code-copy-btn")) return;
      const pre = figure.querySelector("pre");
      const code = figure.querySelector("code");
      if (!pre || !code) return;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy-btn";
      btn.setAttribute("aria-label", "Copy code");

      const setLabel = (html: string) => {
        btn.innerHTML = html;
      };

      const idle = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>`;
      setLabel(idle);

      btn.addEventListener("click", async () => {
        const text = code.textContent ?? "";
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          // Fallback for older browsers / non-secure contexts
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setLabel(
          `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>Copied</span>`
        );
        btn.classList.add("copied");
        setTimeout(() => {
          btn.classList.remove("copied");
          setLabel(idle);
        }, 1600);
      });

      figure.appendChild(btn);
      buttons.push(btn);
    });

    return () => {
      buttons.forEach((b) => b.remove());
    };
  }, [containerId]);

  return null;
}
