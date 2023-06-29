/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /past-system\/.*$/,
      use: 'null-loader'
    })

    return config
  },
}

module.exports = nextConfig
