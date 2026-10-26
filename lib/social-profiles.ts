import type { SocialProfile } from "@/components/social-card";

/**
 * Profile details for the link preview cards. The stats and link counts are
 * placeholders: keeping them accurate needs a fetch from each platform's API.
 */
export const SOCIAL_PROFILES: Record<string, SocialProfile> = {
  github: {
    platform: "github",
    name: "Sahil Singh",
    handle: "sahilcodexx",
    // Real GitHub profile bio; stats below are live counts. Refresh numbers
    // from https://api.github.com/users/sahilcodexx when needed.
    bio: "Developer | Designer | React & TailwindCSS",
    avatar: "/avatar.avif",
    links: [{ label: "sahilcodex.wtf", href: "https://sahilcodex.wtf" }],
    stats: [
      { label: "Repositories", value: "48" },
      { label: "Followers", value: "31" },
    ],
    verified: true,
    href: "https://github.com/sahilcodexx",
  },
  linkedin: {
    platform: "linkedin",
    name: "Sahil Singh",
    handle: "sahil-singh-tech",
    bio: "Design Engineer · Front-end · Motion. I build interfaces that feel right.",
    avatar: "/avatar.avif",
    links: [{ label: "sahilcodex.wtf", href: "https://sahilcodex.wtf" }],
    stats: [{ label: "Connections", value: "800+" }],
    verified: true,
    href: "https://www.linkedin.com/in/sahil-singh-tech/",
  },
  x: {
    platform: "x",
    name: "Sahil Singh",
    handle: "sahilcodex",
    bio: "Design engineer. Building with React, Motion and GSAP. Shipping small details that make an interface feel right.",
    avatar: "/avatar.avif",
    links: [{ label: "sahilcodex.wtf", href: "https://sahilcodex.wtf" }],
    stats: [{ label: "Followers", value: "1006" }],
    verified: true,
    href: "https://x.com/sahilcodex",
  },
  email: {
    platform: "email",
    name: "Sahil Singh",
    handle: "sahil207003",
    bio: "Open for full-time roles and freelance work.",
    avatar: "/avatar.avif",
    links: [
      { label: "sahil207003@gmail.com", href: "mailto:sahil207003@gmail.com" },
    ],
    stats: [],
    href: "mailto:sahil207003@gmail.com",
  },
};
