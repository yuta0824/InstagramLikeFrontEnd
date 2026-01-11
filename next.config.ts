import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3030',
        pathname: '/rails/active_storage/**'
      }
    ]
  }
}

export default nextConfig
