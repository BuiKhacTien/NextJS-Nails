/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    modern: true,
    scrollRestoration: true,
 },
}

module.exports = nextConfig
