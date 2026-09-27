import { getAllProjects } from "@/lib/content";
import ProjectsView, { type ProjectCard } from "@/components/projects-view";

export const revalidate = 3600;

export const metadata = {
  title: "Projects — Sahil Singh",
  description: "Things I have designed and built.",
};

const IMAGE_FALLBACKS: Record<string, string> = {
  chefyai: "/projects/chefyai.webp",
  findmovie: "/projects/findmovie.webp",
  nova: "/projects/nova.webp",
};

function shortTitle(title: string): string {
  // "Bookmrk: Privacy-First Bookmark Manager" -> "Bookmrk"
  return title.split(":")[0].trim();
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const cards: ProjectCard[] = projects.map((p) => ({
    slug: p.slug,
    title: shortTitle(p.title),
    subtitle: p.title.slice(p.title.indexOf(":") + 1).trim() || p.title,
    description: p.description,
    image: IMAGE_FALLBACKS[p.slug] ?? p.image ?? "",
    status: p.status ?? p.timeline ?? "—",
    technologies: p.technologies ?? [],
    github: p.github,
    live: p.live,
  }));

  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <div className="w-full max-w-xl">
        <ProjectsView projects={cards} />
      </div>
    </main>
  );
}
