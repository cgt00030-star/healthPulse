/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"]
  }
}

// PWA configuration will be added later
module.exports = nextConfig