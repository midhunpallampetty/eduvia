import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            key: "host",
            value: "eduvia.space", // <== THIS is where you specify domain!
          },
        ],
        destination: "https://www.eduvia.space/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
