import ComponentDoc from "@/components/component-doc";
import { LoaderAnimation } from "@/components/ui/loader-animation";
import { loaderAnimationSourceCode } from "@/lib/source-codes";

const usage = `import LoaderAnimation from "@/components/ui/loader-animation";

export default function Page() {
  return <LoaderAnimation />;
}`;

const props = `type Props = {
  greetings?: string[]; // words to cycle (defaults to hello in many languages)
  interval?: number;    // ms per word (default 900)
  onComplete?: () => void;
};`;

export const metadata = {
  title: "Hello Page Loader — Playground",
  description: "Multilingual greeting loader built with Motion.",
};

export default function PageLoaderPage() {
  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <div className="w-full max-w-xl">
        <ComponentDoc
          title="Hello Page Loader"
          description="Multilingual greeting loader built with Motion. Each word fades into the next without blocking the page."
          preview={<LoaderAnimation />}
          cli="https://sahilcodex.vercel.app/r/loader-animation.json"
          deps={["motion"]}
          manualSteps={[
            {
              label: "Component",
              file: "components/ui/loader-animation.tsx",
              code: loaderAnimationSourceCode,
            },
          ]}
          usage={[
            { label: "Basic", code: usage },
            { label: "Props", code: props },
          ]}
        />
      </div>
    </main>
  );
}
