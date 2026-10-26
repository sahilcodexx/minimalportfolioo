"use client";

import Image from "next/image";
import HoverPreview from "@/components/hover-preview";

export type SocialStat = { label: string; value: string };

export type SocialProfile = {
  /** Platform key, picks the card layout */
  platform: "github" | "linkedin" | "x" | "email";
  /** Display name */
  name: string;
  /** Handle without the leading @ */
  handle: string;
  /** One-line bio */
  bio: string;
  /** Avatar shown in the card */
  avatar: string;
  /** Extra links listed under the bio */
  links: { label: string; href: string }[];
  /** Stats row at the bottom */
  stats: SocialStat[];
  /** Whether the account shows a verified badge */
  verified?: boolean;
  /** Link the card itself points at */
  href: string;
};

export type SocialCardProps = {
  profile: SocialProfile;
  /** Icon rendered on the trigger */
  icon: React.ReactNode;
  /** Classes for the trigger anchor */
  className?: string;
};

/* Platform brand colours, used for the accent and the verified badge. */
const ACCENT: Record<SocialProfile["platform"], string> = {
  github: "#e6edf3",
  linkedin: "#0a66c2",
  x: "#1d9bf0",
  email: "#e4e4e7",
};

function VerifiedBadge({ platform }: { platform: SocialProfile["platform"] }) {
  if (platform === "github") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#e6edf3" aria-label="Verified">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={ACCENT[platform]} aria-label="Verified">
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.12.46-1.39.2-2.9-.81-3.91-1.01-1.01-2.52-1.27-3.91-.81C14.67 2.63 13.43 1.75 12 1.75c-1.43 0-2.67.88-3.12 2.19a3.86 3.86 0 0 0-3.91-.81c-1.01 1.01-1.27 2.52-.81 3.91A3.86 3.86 0 0 0 1.75 12c0 1.43.88 2.67 2.19 3.12a3.86 3.86 0 0 0-.81 3.91c.51 1.01 1.52 1.85 2.63 1.85.45 0 .89-.09 1.28-.25.71.98 1.79 1.62 3.06 1.62 1.43 0 2.67-.88 3.12-2.19.39.16.83.25 1.28.25 1.11 0 2.12-.84 2.63-1.85.47-1.01.38-2.19-.24-3.13.88-.47 1.46-1.61 1.46-3.12Z" />
      <path d="M10.9 15.02 7.6 11.7l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.52Z" fill="#fff" />
    </svg>
  );
}

function StatRow({ profile }: { profile: SocialProfile }) {
  return (
    <span className="mt-3 flex gap-4 text-[15px] text-[var(--muted)]">
      {profile.stats.map((stat) => (
        <span key={stat.label}>
          <span className="font-semibold text-[var(--foreground)]">{stat.value}</span>{" "}
          {stat.label}
        </span>
      ))}
    </span>
  );
}

function Links({ profile, accent }: { profile: SocialProfile; accent: string }) {
  return (
    <span className="mt-2 block space-y-0.5">
      {profile.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate text-[15px] hover:underline"
          style={{ color: accent }}
        >
          {link.label}
        </a>
      ))}
    </span>
  );
}

/**
 * A social link that reveals a profile card on hover. Each platform gets its
 * own layout, in the shape of that platform's own link preview.
 */
export default function SocialCard({
  profile,
  icon,
  className,
}: SocialCardProps) {
  const accent = ACCENT[profile.platform];

  let card: React.ReactNode;
  if (profile.platform === "github") {
    card = (
      <>
        <span className="flex items-center gap-3 px-4 py-3.5">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-[var(--hairline)]"
          />
          <span className="min-w-0">
            <span className="flex items-center gap-1.5">
              <span className="truncate text-[15px] font-semibold text-[var(--foreground)]">
                {profile.name}
              </span>
              {profile.verified && <VerifiedBadge platform="github" />}
            </span>
            <span className="block truncate text-[12px] text-[var(--muted)]">
              @{profile.handle}
            </span>
          </span>
        </span>

        <span className="block px-4 pb-3 text-[15px] leading-5 text-[var(--foreground)]">
          {profile.bio}
        </span>

        {profile.links.length > 0 && (
          <span className="block border-t border-[var(--hairline)] px-4 py-2.5">
            {profile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-[12px] text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            ))}
          </span>
        )}

        {profile.stats.length > 0 && (
          <span className="flex gap-4 border-t border-[var(--hairline)] px-4 py-2.5 text-[12px] text-[var(--muted)]">
            {profile.stats.map((stat) => (
              <span key={stat.label}>
                <span className="font-semibold text-[var(--foreground)]">
                  {stat.value}
                </span>{" "}
                {stat.label}
              </span>
            ))}
          </span>
        )}
      </>
    );
  } else if (profile.platform === "linkedin") {
    card = (
      <>
        <span className="block h-1 w-full" style={{ background: accent }} />

        <span className="block px-4 pb-4 pt-3.5">
          <span className="flex items-start justify-between gap-3">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={56}
              height={56}
              className="-mt-7 h-14 w-14 shrink-0 rounded-full object-cover ring-[3px] ring-[var(--surface)]"
            />
            {profile.verified && (
              <span className="mt-0.5">
                <VerifiedBadge platform="linkedin" />
              </span>
            )}
          </span>

          <span className="mt-2 block text-[17px] font-semibold text-[var(--foreground)]">
            {profile.name}
          </span>
          <span className="block text-[15px] text-[var(--muted)]">
            {profile.handle}
          </span>

          <span className="mt-2.5 block text-[15px] leading-5 text-[var(--foreground)]">
            {profile.bio}
          </span>

          {profile.links.length > 0 && (
            <span className="mt-2 block space-y-0.5">
              {profile.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-[15px] font-medium hover:underline"
                  style={{ color: accent }}
                >
                  {link.label}
                </a>
              ))}
            </span>
          )}

          <span className="mt-3 flex gap-4 text-[12px] text-[var(--muted)]">
            {profile.stats.map((stat) => (
              <span key={stat.label}>
                <span className="font-semibold text-[var(--foreground)]">
                  {stat.value}
                </span>{" "}
                {stat.label}
              </span>
            ))}
          </span>
        </span>
      </>
    );
  } else if (profile.platform === "email") {
    card = (
      <span className="block px-4 py-3.5">
        <span className="flex items-center gap-3">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[var(--hairline)]"
          />
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold text-[var(--foreground)]">
              {profile.name}
            </span>
            <span className="block truncate text-[12px] text-[var(--muted)]">
              {profile.links[0]?.label ?? profile.handle}
            </span>
          </span>
        </span>
        <span className="mt-2.5 block text-[15px] leading-5 text-[var(--muted)]">
          {profile.bio}
        </span>
      </span>
    );
  } else {
    /* X (Twitter) */
    card = (
      <>
        <span className="block h-[68px] bg-[linear-gradient(120deg,color-mix(in_srgb,var(--foreground)_14%,transparent),color-mix(in_srgb,var(--foreground)_4%,transparent))]" />

        <span className="block px-4 pb-4">
          <span className="-mt-8 block">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-[3px] ring-[var(--surface)]"
            />
          </span>

          <span className="mt-2 flex items-center gap-1.5">
            <span className="truncate text-[17px] font-semibold text-[var(--foreground)]">
              {profile.name}
            </span>
            {profile.verified && <VerifiedBadge platform="x" />}
          </span>

          <span className="block text-[15px] text-[var(--muted)]">
            @{profile.handle}
          </span>

          <span className="mt-3 block text-[15px] leading-5 text-[var(--foreground)]">
            {profile.bio}
          </span>

          <Links profile={profile} accent={accent} />

          <StatRow profile={profile} />
        </span>
      </>
    );
  }

  return (
    <HoverPreview
      width={
        profile.platform === "github" ? 290 : profile.platform === "email" ? 280 : 300
      }
      trigger={
        <a
          className={className}
          href={profile.href}
          target={profile.href.startsWith("http") ? "_blank" : undefined}
          rel={profile.href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={profile.platform}
        >
          {icon}
        </a>
      }
      card={card}
    />
  );
}
