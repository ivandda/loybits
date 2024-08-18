/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@polkadot/.*'],
  images: {
    domains: ["vercel.com"],
  },
};

module.exports = nextConfig;
