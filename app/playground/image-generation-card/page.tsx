import ComponentDoc, { type PropRow } from "@/components/component-doc";
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

const PROPS: PropRow[] = [
  {
    name: "generateDuration",
    type: "number",
    description:
      "Seconds the blinking-grid animation runs before the image pops in. Defaults to 3.",
  },
  {
    name: "imageSrc",
    type: "string",
    description: "Image source to reveal at the end.",
  },
  {
    name: "imageAlt",
    type: "string",
    description: "Alt text for the revealed image.",
  },
  {
    name: "label",
    type: "string",
    description:
      'Label shown at the bottom-left while generating. Defaults to "Generating image".',
  },
  {
    name: "className",
    type: "string",
    description: "Extra classes for the card container.",
  },
];

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
          props={PROPS}
          notes="Recreates the generation state used in ChatGPT and Midjourney: blinking grid build-up, blur-to-focus reveal, shine sweep and a live timer."
        />
      </div>
    </main>
  );
}
