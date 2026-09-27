export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  // SiteNav in the root layout already provides the nav pill + back button.
  return <>{children}</>;
}
