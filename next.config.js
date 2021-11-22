/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})
const withPWA = require('next-pwa')

module.exports = withBundleAnalyzer(
	withPWA({
		pwa: {
			dest: 'public',
			dynamicStartUrlRedirect: true,
			disable: process.env.NODE_ENV === 'development',
		},
		images: {
			domains: [
				'www.merchantequip.com',
				'googleusercontent.com',
				'lh3.googleusercontent.com',
				'lh5.googleusercontent.com',
				'firebasestorage.googleapis.com',
			],
		},
	})
)
