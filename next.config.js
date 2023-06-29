/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.tsx$/,
      include: /past-system/,
      use: 'null-loader'
    })

    return config
  },
}

module.exports = nextConfig
