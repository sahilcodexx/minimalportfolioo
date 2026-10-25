import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * No incremental-cache override: the R2 bucket was never provisioned, and the
 * default in-memory cache is enough for this site's ISR pages.
 */
export default defineCloudflareConfig({});
