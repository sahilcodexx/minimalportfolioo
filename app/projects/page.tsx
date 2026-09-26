import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import FloatingBack from "@/components/floating-back";

export const revalidate = 3600;

export const metadata = {
  title: "Projects — Sahil Singh",
  description: "Things I have designed and built.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <FloatingBack fallback="/" />
      <div className="w-full max-w-xl">
        <h1 className="mt-4 text-2xl font-medium tracking-tight text-[var(--foreground)]">
          Projects
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">
          Things I have designed and built.
        </p>

        <div className="row-list mt-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="row flex items-baseline justify-between py-1.5 text-[15px]"
            >
              <span className="link">{project.title}</span>
              <span className="text-[13px] text-[var(--muted)]">
                {project.status ?? project.timeline ?? ""}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
