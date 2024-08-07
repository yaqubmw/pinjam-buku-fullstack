/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: `${String(process.env.SERVER_URL) || "http://localhost:8000"}/api/:path*`
        },
      ],
    };
  },
};

export default nextConfig;
