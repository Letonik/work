/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = {
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["mongoose"],
	},
};
module.exports = nextConfig;
