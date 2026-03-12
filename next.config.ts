import createNextIntlPlugin from "next-intl/plugin";
import { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	reactCompiler: true,
	reactStrictMode: false,
};

export default withNextIntl(nextConfig);
