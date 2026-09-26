import matter from "gray-matter";

const RAW_BASE =
  "https://raw.githubusercontent.com/sahilcodexx/sahilcodex/main/src/data";
const REVALIDATE = 3600; // 1 hour

export type BlogMeta = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  date: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  github?: string;
  live?: string;
  timeline?: string;
  role?: string;
  team?: string;
  status?: string;
};

export type ContentDoc<M> = {
  meta: M;
  content: string;
};

async function fetchMd(kind: "blog" | "projects", slug: string): Promise<string | null> {
  const res = await fetch(`${RAW_BASE}/${kind}/${slug}.md`, {
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) return null;
  return res.text();
}

function parse<M>(raw: string): ContentDoc<M> {
  const { data, content } = matter(raw);
  return { meta: data as M, content };
}

/* ---------------- Blog ---------------- */

export const BLOG_SLUGS = ["lazyvim", "react-state-management", "motion", "approuter"] as const;

export async function getAllBlogs(): Promise<BlogMeta[]> {
  const posts = await Promise.all(
    BLOG_SLUGS.map(async (slug): Promise<BlogMeta | null> => {
      const raw = await fetchMd("blog", slug);
      if (!raw) return null;
      const { meta } = parse<BlogMeta & { isPublished?: boolean }>(raw);
      if (meta.isPublished === false) return null;
      return { ...meta, slug };
    })
  );
  return posts
    .filter((p): p is BlogMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlog(slug: string): Promise<ContentDoc<BlogMeta> | null> {
  if (!BLOG_SLUGS.includes(slug as (typeof BLOG_SLUGS)[number])) return null;
  const raw = await fetchMd("blog", slug);
  if (!raw) return null;
  return parse<BlogMeta>(raw);
}

/* ---------------- Projects ---------------- */

export const PROJECT_SLUGS = [
  "bookmrk",
  "mechanicalkeyboard",
  "tcxcommit",
  "pricetracker",
  "chefyai",
  "findmovie",
  "imageeditorai",
  "nova",
] as const;

export async function getAllProjects(): Promise<ProjectMeta[]> {
  const projects = await Promise.all(
    PROJECT_SLUGS.map(async (slug): Promise<ProjectMeta | null> => {
      const raw = await fetchMd("projects", slug);
      if (!raw) return null;
      const { meta } = parse<ProjectMeta>(raw);
      return { ...meta, slug };
    })
  );
  return projects.filter((p): p is ProjectMeta => p !== null);
}

export async function getProject(slug: string): Promise<ContentDoc<ProjectMeta> | null> {
  if (!PROJECT_SLUGS.includes(slug as (typeof PROJECT_SLUGS)[number])) return null;
  const raw = await fetchMd("projects", slug);
  if (!raw) return null;
  return parse<ProjectMeta>(raw);
}
