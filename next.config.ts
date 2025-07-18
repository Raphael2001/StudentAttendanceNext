import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useLightningcss: true,
    reactCompiler: true,
  },
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
