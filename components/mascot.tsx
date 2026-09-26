export default function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {/* soft shadow / fade under the cat - matches screenshot */}
      <ellipse cx="60" cy="88" rx="18" ry="5" fill="black" opacity={0.07} />
      <ellipse cx="60" cy="88" rx="11" ry="3" fill="black" opacity={0.06} />

      {/* left ear outer */}
      <path
        d="M 30 29 C 24 18 21 9 25.5 5.8 C 29 3.2 37.5 8.5 42 20.2"
        fill="#111111"
        stroke="#111111"
        strokeLinejoin="round"
        strokeWidth={0.8}
      />
      {/* left ear inner pink */}
      <path
        d="M 28.6 14.6 C 29.2 10.2 31.2 8.4 33.8 10.2 C 36 12.2 37.4 15.9 37 19 L 29 16.2 Z"
        fill="#f9a8b7"
      />

      {/* right ear outer */}
      <path
        d="M 90 29 C 96 18 99 9 94.5 5.8 C 91 3.2 82.5 8.5 78 20.2"
        fill="#111111"
        stroke="#111111"
        strokeLinejoin="round"
        strokeWidth={0.8}
      />
      {/* right ear inner pink */}
      <path
        d="M 91.4 14.6 C 90.8 10.2 88.8 8.4 86.2 10.2 C 84 12.2 82.6 15.9 83 19 L 91 16.2 Z"
        fill="#f9a8b7"
      />

      {/* head base - white */}
      <path
        d="M 21 44 C 21 22 31.5 14.2 60 12 C 88.5 14.2 99 22 99 44 C 99 63 88.5 74.5 60 74.5 C 31.5 74.5 21 63 21 44 Z"
        fill="white"
        stroke="#0f0f0f"
        strokeWidth={1.35}
        strokeLinejoin="round"
      />

      {/* black hair on top */}
      <path
        d="M 21 44 C 21 22 31.5 14.2 60 12 C 88.5 14.2 99 22 99 44 C 99 46.8 97.5 48.6 94.2 48.6 C 88.5 48.6 86.2 36.2 78.5 30.2 C 72.2 25.6 61.5 27.2 54.2 34 C 48.2 27.2 36.8 25.2 31.5 31.5 C 26.2 37.2 24 48.6 18.6 48.6 C 15.8 48.6 15 45.6 15 44"
        fill="#0f0f0f"
      />

      {/* white bridge between eyes */}
      <path
        d="M 48 36 L 72 36 L 60 54 Z"
        fill="white"
        opacity={0.95}
      />

      {/* eyes */}
      <ellipse cx="42.5" cy="49.2" rx="8.1" ry="9.2" fill="#0f0f0f" />
      <ellipse cx="77.5" cy="49.2" rx="8.1" ry="9.2" fill="#0f0f0f" />
      {/* eye highlights */}
      <circle cx="45.1" cy="46.2" r={2.15} fill="white" />
      <circle cx="80.1" cy="46.2" r={2.15} fill="white" />
      <circle cx="43.6" cy="49.4" r={0.85} fill="white" opacity={0.75} />
      <circle cx="78.6" cy="49.4" r={0.85} fill="white" opacity={0.75} />

      {/* blush */}
      <ellipse cx="28.2" cy="56.8" rx="5.1" ry={2.7} fill="#ffc2cd" />
      <ellipse cx="91.8" cy="56.8" rx="5.1" ry={2.7} fill="#ffc2cd" />

      {/* nose + mouth */}
      <path d="M 59.1 52.6 L 61 52.6 L 60.05 53.9 Z" fill="#0f0f0f" />
      <path
        d="M 60.05 53.9 C 59.4 54.9 58.2 55.7 57.3 56 C 58.1 56.7 59.05 57.05 60.05 56.9 C 61.05 57.05 61.95 56.7 62.8 56 C 61.9 55.7 60.7 54.9 60.05 53.9 Z"
        fill="none"
        stroke="#0f0f0f"
        strokeWidth={0.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 60.05 53.9 L 60.05 55.2"
        stroke="#0f0f0f"
        strokeWidth={0.65}
        strokeLinecap="round"
      />

      {/* whiskers */}
      <path d="M 17.8 51.2 C 12 50.2 8.2 49.2 7.2 48.2" stroke="#0f0f0f" strokeWidth={0.7} strokeLinecap="round" opacity={0.95} />
      <path d="M 17.8 54.4 C 12 54.4 8.2 54.7 7.2 55.2" stroke="#0f0f0f" strokeWidth={0.7} strokeLinecap="round" opacity={0.95} />
      <path d="M 19.6 57.6 C 14 58 9.8 58.7 9 59.4" stroke="#0f0f0f" strokeWidth={0.7} strokeLinecap="round" opacity={0.95} />
      <path d="M 102.2 51.2 C 108 50.2 111.8 49.2 112.8 48.2" stroke="#0f0f0f" strokeWidth={0.7} strokeLinecap="round" opacity={0.95} />
      <path d="M 102.2 54.4 C 108 54.4 111.8 54.7 112.8 55.2" stroke="#0f0f0f" strokeWidth={0.7} strokeLinecap="round" opacity={0.95} />
      <path d="M 100.4 57.6 C 106 58 110.2 58.7 111 59.4" stroke="#0f0f0f" strokeWidth={0.7} strokeLinecap="round" opacity={0.95} />

      {/* chest hint */}
      <path d="M 45.8 74.5 C 48.2 79 51.8 81.2 60 81.2 C 68.2 81.2 71.8 79 74.2 74.5" fill="white" stroke="#0f0f0f" strokeWidth={0.9} strokeLinejoin="round" />
      <path d="M 51.5 74.8 L 52.2 81" stroke="#0f0f0f" strokeWidth={0.65} strokeLinecap="round" />
      <path d="M 68.5 74.8 L 67.8 81" stroke="#0f0f0f" strokeWidth={0.65} strokeLinecap="round" />
    </svg>
  );
}
