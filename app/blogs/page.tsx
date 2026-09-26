import Link from "next/link";
import { getAllBlogs } from "@/lib/content";
import FloatingBack from "@/components/floating-back";

export const revalidate = 3600;

export const metadata = {
  title: "Notes — Sahil Singh",
  description: "Writing on React, Next.js, Neovim and frontend engineering.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogsPage() {
  const posts = await getAllBlogs();

  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <FloatingBack fallback="/" />
      <div className="w-full max-w-xl">
        <h1 className="mt-4 text-2xl font-medium tracking-tight text-[var(--foreground)]">
          Notes
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">
          Writing on React, Next.js, Neovim and frontend engineering.
        </p>

        <div className="row-list mt-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="row flex items-baseline justify-between py-1.5 text-[15px]"
            >
              <span className="link">{post.title}</span>
              <span className="text-[13px] text-[var(--muted)]">
                {formatDate(post.date)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
