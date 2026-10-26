import type { NextConfig } from "next";

// A static site: `npm run build` writes plain HTML/CSS/JS to ./out, which any host can serve.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
};

export default nextConfig;
