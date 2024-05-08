/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "artix.com",
				pathname: "/media/**",
			},
		],
	},
};

export default nextConfig;
