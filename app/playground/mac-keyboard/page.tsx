import ComponentDoc from "@/components/component-doc";
import CustomKeyboard from "@/components/ui/custom-keyboard";
import { customKeyboardSourceCode } from "@/lib/source-codes";

const usage = `import CustomKeyboard from "@/components/ui/custom-keyboard";

export default function Page() {
  return <CustomKeyboard />;
}`;

const props = `interface Key { code: string; label: string }
type Props = {
  onKeyPress?: (key: Key) => void; // fires on physical + on-screen presses
  theme?: "space-black" | "silver"; // default: "space-black"
  soundEnabled?: boolean;           // default: true
  hapticsEnabled?: boolean;         // default: true (mobile)
};`;

export const metadata = {
  title: "Mac Keyboard — Playground",
  description:
    "Interactive Mac keyboard replica with real-time keystroke tracking and authentic layout geometry.",
};

export default function MacKeyboardPage() {
  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <div className="w-full max-w-xl">
        <ComponentDoc
          title="Mac Keyboard"
          description="Interactive Mac keyboard replica with real-time keystroke tracking and authentic layout geometry. Features active states for physical key presses and optional sound feedback."
          preview={<CustomKeyboard />}
          cli="https://sahilcodex.vercel.app/r/keyboard.json"
          deps={["lucide-react", "web-haptics", "clsx", "tailwind-merge"]}
          manualSteps={[
            {
              label: "Component",
              file: "components/ui/custom-keyboard.tsx",
              code: customKeyboardSourceCode,
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
