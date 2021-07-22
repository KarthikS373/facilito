const withPWA = require('next-pwa')

module.exports = withPWA({
	pwa: {
		dest: 'public',
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
