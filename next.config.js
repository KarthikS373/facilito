const withPWA = require('next-pwa')

module.exports = withPWA({
	pwa: {
		dest: 'public',
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
