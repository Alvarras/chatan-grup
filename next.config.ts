import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.africau.edu",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
