import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECT_SLUGS, getProject } from "@/lib/content";
import { renderMarkdown, extractSections } from "@/lib/markdown";
import ArticleScrollProgress from "@/components/article-scroll-progress";
import CopyCode from "@/components/copy-code";

export const revalidate = 3600;

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getProject(slug);
  if (!doc) return { title: "Not found" };
  return { title: `${doc.meta.title} — Sahil Singh`, description: doc.meta.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getProject(slug);
  if (!doc) notFound();

  const { meta, content } = doc;
  const html = await renderMarkdown(content);
  const sections = extractSections(content);

  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <div className="w-full max-w-xl">
        <h1 className="mt-4 text-2xl font-medium tracking-tight text-[var(--foreground)]">
          {meta.title}
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">
          {meta.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
          {meta.github && (
            <a className="link" href={meta.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {meta.live && (
            <a className="link" href={meta.live} target="_blank" rel="noopener noreferrer">
              Live
            </a>
          )}
          {meta.status && (
            <span className="text-[var(--muted)]">{meta.status}</span>
          )}
        </div>

        {meta.image && (
          <Image
            src={meta.image}
            alt={meta.title}
            width={1200}
            height={630}
            className="mt-6 w-full rounded-xl object-cover ring-1 ring-[var(--hairline)]"
          />
        )}

        <article
          id="article-body"
          className="typeset typeset-docs mt-8 max-w-[37em]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <CopyCode containerId="article-body" />

      <ArticleScrollProgress sections={sections} />
    </main>
  );
}
