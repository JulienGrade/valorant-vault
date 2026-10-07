import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.valorant-api.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
    qualities: [75],
  },
};

export default nextConfig;