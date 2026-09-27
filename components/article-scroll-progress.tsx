"use client";

import { ScrollProgress, type ScrollProgressSection } from "@/components/ui/scroll-progress";

export default function ArticleScrollProgress({
  sections,
}: {
  sections: ScrollProgressSection[];
}) {
  if (!sections.length) return null;

  return <ScrollProgress sections={sections} />;
}
