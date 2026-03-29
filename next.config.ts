import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "brilliant-dragon-914.convex.cloud",
        port: "",
      },
    ],
  },
  // }
};

export default nextConfig;
