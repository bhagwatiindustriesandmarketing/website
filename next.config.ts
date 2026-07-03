import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for S3/CloudFront hosting — no Node server available there.
  output: "export",
  // next/image's on-the-fly optimization needs a server; S3 can't run one.
  images: { unoptimized: true },
};

export default nextConfig;
