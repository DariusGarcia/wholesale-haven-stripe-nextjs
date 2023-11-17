/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['files.stripe.com', 'images.unsplash.com', 'cdn.sanity.io/images']
  }
}

module.exports = nextConfig
