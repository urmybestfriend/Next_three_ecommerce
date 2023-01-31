const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  images: {
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    loader: "imgix", // Uncomment this line for STATIC EXPORT
    path: "./", // Uncomment this line for STATIC EXPORT
  },
  env: {
    production_type: "static", // Change variable to "static" or "server"
    // NEXT_PUBLIC_API_URL: "https://powerful-bayou-56352.herokuapp.com/api/",// uncomment this for local "http://localhost:9001/api/",
    NEXT_PUBLIC_API_URL: "http://localhost:9001/api/",// uncomment this for local "http://localhost:9001/api/",
  },
  distDir: "build",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
