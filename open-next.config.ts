import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * The Cloudflare Workers build runs `bun run build` and then
 * `npx wrangler deploy`. Wrangler sees an OpenNext project and delegates to
 * `opennextjs-cloudflare deploy`, which needs the OpenNext bundle that only
 * `opennextjs-cloudflare build` produces. So `bun run build` runs the OpenNext
 * build.
 *
 * OpenNext then runs `buildCommand` for the inner Next.js build. Point it at
 * `next build` directly, because `bun run build` is now the OpenNext build and
 * would recurse.
 */
const config = defineCloudflareConfig();

const openNextConfig = {
  ...config,
  buildCommand: "next build",
};

export default openNextConfig;
