import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_SLUGS, getBlog } from "@/lib/content";
import { renderMarkdown, extractSections } from "@/lib/markdown";
import ArticleScrollProgress from "@/components/article-scroll-progress";
import CopyCode from "@/components/copy-code";

export const revalidate = 3600;

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getBlog(slug);
  if (!doc) return { title: "Not found" };
  return { title: `${doc.meta.title} — Sahil Singh`, description: doc.meta.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getBlog(slug);
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
        <p className="mt-2 text-[13px] text-[var(--muted)]">
          {new Date(meta.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          {meta.tags?.length ? ` · ${meta.tags.join(", ")}` : ""}
        </p>

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
