import Mascot from "./mascot";

// Simple peek — kept exactly as in your screenshots for video recording
// Don't edit mascot. Enhanced 4-mascot-4 version is in four0four-enhanced.tsx
export default function Four0Four() {
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-[#f5f5f5] px-6">
      <Mascot className="h-[92px] w-[105px] sm:h-[110px] sm:w-[124px]" />
    </div>
  );
}
