import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

import bash from "@shikijs/langs/bash";
import jsx from "@shikijs/langs/jsx";
import json from "@shikijs/langs/json";
import lua from "@shikijs/langs/lua";
import sh from "@shikijs/langs/sh";
import tsx from "@shikijs/langs/tsx";
import typescript from "@shikijs/langs/typescript";
import githubLight from "@shikijs/themes/github-light";
import githubDarkDefault from "@shikijs/themes/github-dark-default";

/**
 * Shiki's default Oniguruma engine needs WebAssembly, which Cloudflare Workers
 * refuses to instantiate at request time ("Wasm code generation disallowed by
 * embedder"), so every page that highlights code 500s on the deployed Worker.
 * The pure-JS RegExp engine needs no WASM and runs on Workers.
 *
 * Langs are imported one by one instead of using `bundledLanguages` so the
 * Worker bundle only carries the grammars this site actually uses.
 */
const LANGS = [bash, jsx, json, lua, sh, tsx, typescript];

const THEMES = { light: githubLight, dark: githubDarkDefault } as const;

let highlighterPromise: Promise<HighlighterCore> | undefined;

export function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= createHighlighterCore({
    themes: [THEMES.light, THEMES.dark],
    langs: LANGS,
    engine: createJavaScriptRegexEngine(),
  });
  return highlighterPromise;
}
