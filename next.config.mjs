/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/signin",      destination: "/api/auth/signin", permanent: false },
      { source: "/get-started", destination: "/signin",          permanent: false }
    ];
  },
};
export default nextConfig;