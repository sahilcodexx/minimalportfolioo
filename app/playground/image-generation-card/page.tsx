import ComponentDoc from "@/components/component-doc";
import { AiImageCard } from "@/components/ui/ai-image-card";
import { aiImageCardSourceCode } from "@/lib/source-codes";

const usage = `import AiImageCard from "@/components/ui/ai-image-card";

export default function Page() {
  return <AiImageCard />;
}`;

const props = `type Props = {
  imageUrl?: string;        // image revealed after generation
  duration?: number;        // fake generation time in ms (default 6000)
  onGenerated?: () => void; // fires when reveal completes
};`;

export const metadata = {
  title: "Image Generation Card — Playground",
  description:
    "AI-style image generation card with blinking grid, blur-to-focus reveal and live timer.",
};

export default function ImageGenerationCardPage() {
  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <div className="w-full max-w-xl">
        <ComponentDoc
          title="Image Generation Card"
          description="Recreates the AI image-generation state used in ChatGPT, DALL·E and Midjourney — blinking grid, blur-to-focus reveal, shine sweep, and a live generation timer."
          preview={<AiImageCard />}
          cli="https://sahilcodex.vercel.app/r/ai-image-card.json"
          deps={["motion"]}
          manualSteps={[
            {
              label: "Component",
              file: "components/ui/ai-image-card.tsx",
              code: aiImageCardSourceCode,
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
