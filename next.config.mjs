/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },
  typescript: {
    // Enable seamless production deployments
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  }
};

export default nextConfig;
