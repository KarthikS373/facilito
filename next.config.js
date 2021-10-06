/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})
const withPWA = require('next-pwa')

module.exports = withBundleAnalyzer(
	withPWA({
		webpack5: true,
		webpack: (config) => {
			config.resolve.fallback = {
				fs: false,
				os: false,
				path: false,
				zlib: false,
				http: false,
				https: false,
				crypto: false,
				stream: false,
				child_process: false,
				net: false,
				constants: false,
				tls: false,
			}
			return config
		},
		pwa: {
			dest: 'public',
			dynamicStartUrlRedirect: true,
			disable: process.env.NODE_ENV === 'development',
		},
		images: {
			domains: [
				'googleusercontent.com',
				'lh3.googleusercontent.com',
				'lh5.googleusercontent.com',
				'firebasestorage.googleapis.com',
			],
		},
	})
)
