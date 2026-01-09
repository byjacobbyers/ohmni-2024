import { withNextVideo } from "next-video/process";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  turbopack: {},
  // Note: withNextVideo internally sets experimental.outputFileTracingIncludes
  // which causes a deprecation warning in Next.js 16. This is harmless and will
  // be fixed when next-video updates to Next.js 16 config format.
  // The build still succeeds - this is just a warning.
};

export default withNextVideo(nextConfig);