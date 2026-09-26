import type { ReactNode } from "react";
import FloatingBack from "@/components/floating-back";
import SocialDock from "@/components/social-dock";

export default function PlaygroundLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <FloatingBack fallback="/" />
      {children}
      <SocialDock />
    </>
  );
}
