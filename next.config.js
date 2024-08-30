const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const { version } = require("./package.json");

const nextConfig = {
  reactStrictMode: false,
  env: {
    version,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = withNextIntl(nextConfig);
