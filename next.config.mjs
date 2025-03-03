/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.html$/,
      include: /node_modules/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;
