import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import GithubSlugger from "github-slugger";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark-default",
  },
  keepBackground: false,
};

/** Strip fenced code blocks so `##` inside code is not treated as a heading. */
function stripCodeFences(markdown: string): string {
  return markdown.replace(/^```[\s\S]*?^```/gm, "");
}

/**
 * Extract h2 sections (id + label) matching the ids rehype-slug generates,
 * for the scroll-progress section nav.
 */
export function extractSections(
  markdown: string
): { id: string; label: string }[] {
  const stripped = stripCodeFences(markdown);
  const slugger = new GithubSlugger();
  const sections: { id: string; label: string }[] = [];

  for (const match of stripped.matchAll(/^##\s+(.+?)\s*#*$/gm)) {
    const cleaned = match[1].replace(/[`*_~[\]]/g, "").trim();
    if (!cleaned) continue;
    sections.push({ id: slugger.slug(cleaned), label: cleaned });
  }

  return sections;
}

/** Compile markdown to HTML with syntax highlighting (async pipeline). */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
