import ComponentDoc, { type PropRow } from "@/components/component-doc";
import { SearchBar } from "@/components/ui/search-bar";
import { searchBarSourceCode } from "@/lib/source-codes";

const usage = `import SearchBar from "@/components/ui/search-bar";

export default function Page() {
  return <SearchBar />;
}`;

const props = `type Item = { id: string; label: string; hint?: string };
type Props = {
  items?: Item[];                  // searchable list (has a default demo set)
  placeholder?: string;            // default "Search..."
  onSelect?: (item: Item) => void; // keyboard + click selection
};`;

export const metadata = {
  title: "Search Bar — Playground",
  description:
    "Command-palette style searchable dropdown with keyboard navigation and match highlighting.",
};

const PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    description: "Extra classes for the outer container.",
  },
];

export default function SearchBarPage() {
  return (
    <main className="flex flex-1 justify-center bg-[var(--background)] px-6 pb-28 pt-20 sm:pt-24">
      <div className="w-full max-w-xl">
        <ComponentDoc
          title="Search Bar"
          description="Command-palette style searchable dropdown with keyboard navigation (up/down/Enter/Esc), live match highlighting, animated active pill, and click-outside dismissal."
          preview={<SearchBar />}
          cli="https://sahilcodex.vercel.app/r/search-bar.json"
          deps={["motion", "lucide-react"]}
          manualSteps={[
            {
              label: "Component",
              file: "components/ui/search-bar.tsx",
              code: searchBarSourceCode,
            },
          ]}
          usage={[
            { label: "Basic", code: usage },
            { label: "Props", code: props },
          ]}
          props={PROPS}
          notes="Ships with a demo country list. Full keyboard navigation: arrows to move, Enter to select, Esc to close. Match highlighting and the active pill are animated with Motion."
        />
      </div>
    </main>
  );
}
