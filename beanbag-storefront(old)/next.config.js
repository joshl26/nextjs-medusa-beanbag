/**
 * @type {import('next').NextConfig}
 */

const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  experimental: {
    serverComponentsExternalPackages: [
      "@medusajs/product",
      "@medusajs/modules-sdk",
    ],
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
