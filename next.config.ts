import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Allow HMR when tunneling dev through ngrok (subdomain changes each session).
  allowedDevOrigins: ["*.ngrok-free.dev"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
