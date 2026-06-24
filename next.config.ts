import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Chakra UI v3's Emotion-based style injection double-fires under Strict Mode's
  // dev-only double-invocation, causing a style-tag vs div hydration mismatch on every Box.
  reactStrictMode: false,
};

export default nextConfig;
