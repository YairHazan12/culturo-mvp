import type { NextConfig } from "next";
import path from "node:path";

// Set by the GitHub Pages workflow so the project-site subpath is applied
// only for the deployed build, keeping local dev at the root. The custom
// image loader reads the same value to prefix public/ image URLs.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./image-loader.ts" },
  // Allow HMR when tunneling dev through ngrok (subdomain changes each session).
  allowedDevOrigins: ["*.ngrok-free.dev"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
