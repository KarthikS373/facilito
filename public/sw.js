if (!self.define) {
	const s = (s) => {
			'require' !== s && (s += '.js')
			let e = Promise.resolve()
			return (
				n[s] ||
					(e = new Promise(async (e) => {
						if ('document' in self) {
							const n = document.createElement('script')
							;(n.src = s), document.head.appendChild(n), (n.onload = e)
						} else importScripts(s), e()
					})),
				e.then(() => {
					if (!n[s]) throw new Error(`Module ${s} didn’t register its module`)
					return n[s]
				})
			)
		},
		e = (e, n) => {
			Promise.all(e.map(s)).then((s) => n(1 === s.length ? s[0] : s))
		},
		n = { require: Promise.resolve(e) }
	self.define = (e, i, c) => {
		n[e] ||
			(n[e] = Promise.resolve().then(() => {
				let n = {}
				const t = { uri: location.origin + e.slice(1) }
				return Promise.all(
					i.map((e) => {
						switch (e) {
							case 'exports':
								return n
							case 'module':
								return t
							default:
								return s(e)
						}
					})
				).then((s) => {
					const e = c(...s)
					return n.default || (n.default = e), n
				})
			}))
	}
}
define('./sw.js', ['./workbox-ea903bce'], function (s) {
	'use strict'
	importScripts(),
		self.skipWaiting(),
		s.clientsClaim(),
		s.precacheAndRoute(
			[
				{
					url: '/_next/static/SXfRiHIVI_pfguQ17KnCl/_buildManifest.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/SXfRiHIVI_pfguQ17KnCl/_ssgManifest.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/0bdd3ff4.8d27926d50e1b4ddc7f2.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/124-192b4d5b4b18dab0f8d1.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/1369.e1ab10d0f3163686ad23.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/1487.17cca2752c6acba56878.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/1496.7dde681cd0e36606881d.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/170.c6f07558e92ebc53144f.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/1717.bb466cd2e314e0593723.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/1725.0823b7c39c14bbbde449.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/1857.0c6ca83c9cfbe92b57c7.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/2032.05ee6c6584044ee17f93.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/2044.2e6d6262e1ff0d0f278f.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/2318.53e0c89440ed94f8b9c0.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/2480.b2dd9027ab3fa4f29215.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/2582.7a3c84e401a2c4f81a46.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/2642-66f3d40d01a86428fd68.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/3280-bd16ad0432757e745eb4.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/3451.795207c3c4301ce5e4d9.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/3458.bd79bac5500b84698931.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/3516-555c412ce64c3ca40441.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/3860.d049d76200f3addc9ab1.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/3e7c58dd.a87f0741b6220924f548.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/4322cd96.8adc9d8217ae8fb413e0.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/4346.236f9f8f41eb96824071.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/5187.3b4da36e22895ef583a4.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/5290.96ab9068c15c86cf4a79.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/5503.f3fe015013d8ed6a9e0a.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/5572.c4a2511d0e357d9d3b06.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/6514-8e7f9a477e42c9b2c8a5.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/6728.e060a55f62b534960556.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/6779.44fb01b09c24e5b82ea1.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/6822-87fc0b6d15fda4f84c0c.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/7049.8d9ac4dab1b7df495ff2.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/7112840a.f5536304d4729f4378cb.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/7355-258c5089483d1f968eaf.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/7364.c470e4d762ea318e115b.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/7478-465791d72524e96cfb80.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/7603.aa52783080778bbdb7a1.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/7713-de0d901d460656880b81.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/778.7970f4e0e314830b63de.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/8157.28f197274bbf813bae70.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/8188.9312065deb09095540e5.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/8261-9ea8165bf3d072eaaef6.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/8363.9dbc8ccdaaae89779d9f.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/8506.4f45df541c1c6657c2df.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/8650.5edd2d28b672823d44de.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/8794-666a24f1c663e5dd1227.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/9617-29612b90b7cc70247b2d.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/9862.0cf5385de8bbb4ba6fea.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/98f61148.66860e50cbcdb0b28eb0.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/commons-faa84da32e2eb176a1f1.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/dff27125.5dcdbeb49b386dea67a5.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/f10e284a.746cea583ee0c1dbb64d.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/framework-6d8bcf4953d553d9b017.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/main-d72edf559c6da68e860f.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/_app-bd790da041230abaf200.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/_error-cd3a4dcc303cc09fa80f.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/calendario-80b9c594d1e9eeb20fb5.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/cuenta-980e956ab7eaa2be252b.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/f/%5BformID%5D/%5BformURL%5D-078499b3d41622f08834.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/f/%5BformID%5D/respuestas-fbd93596a0fb49042b1c.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/formularios-021800615c525572bbcf.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/index-139d40ff401fbd74202c.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/p/%5BproductID%5D/editar-22a8c48c3a971ac8ea25.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/productos-ebec2f24f650b7865c58.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/t/%5BformID%5D/editar-18475b21c6201c3f526d.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/pages/tracking-92b3846ea6a3ae76ae31.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/chunks/webpack-a93ac225b4412084494f.js',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{ url: '/_next/static/css/21ad4b3ce4a4a17ad270.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/330b622f861a8afcc753.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/3accd951f0ae4673c6f2.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/4dd9f51324c01ccc20b5.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/5343a54f05bf22c56252.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/5d40cfe2277a69c6b9fa.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/6c006a095129f880eb75.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/6d1b6c4cee89debf6090.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/8360a3e19523713a52df.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/8a479b321cac57ddb57d.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/99b5614c12260060119b.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/9c4969e0c0d6463d48cc.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/a35d857477edd921d781.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/ad8b824933308cefd657.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/bc9d221561807dfb0798.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/bd6b428a7e58bc0fb6c1.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/ccdb71f1d1acf6993a0f.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/d16f5dd3fa147006740c.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/f36f5b53ee909f929ccc.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/fe8daaa498edc234603c.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{ url: '/_next/static/css/ffd5d9435d603329765c.css', revision: 'SXfRiHIVI_pfguQ17KnCl' },
				{
					url: '/_next/static/media/Montserrat-bold.c268a4d85e4bff25b1d3ccbdbed08eb8.otf',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/media/Montserrat-light.d39847adbd2ffbfec8ffb576ab864a3f.otf',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/media/Montserrat-medium.57859b5b795bc47b08080a912944025d.otf',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{
					url: '/_next/static/media/Montserrat-regular.5b030529f4435f9d7dde4622c08da816.otf',
					revision: 'SXfRiHIVI_pfguQ17KnCl',
				},
				{ url: '/assets/brand/icon.png', revision: 'fcc781311b190fcb58fca8cd9faa62ab' },
				{ url: '/assets/brand/logo.png', revision: 'e27357ee956dd9f6165545ae8d0c5485' },
				{ url: '/assets/icons/google.svg', revision: 'f6ce5696e634677f94343db90b9f66dd' },
				{ url: '/assets/icons/whatsapp.svg', revision: 'f4ed67df912a7df12a9648072049529f' },
				{ url: '/favicon.ico', revision: '5929fa74d708e3b5277dcd9d083cb55d' },
				{ url: '/images/badge.png', revision: '9add1ba93adb233bcab6f9cb060ea429' },
				{ url: '/images/icon.png', revision: 'ca4adb4c76f7183d469b7cdbf7e2be0e' },
				{ url: '/images/maskable_icon.png', revision: '0e8acac98ed6b1e8c45d69684b9e1f17' },
				{ url: '/manifest.json', revision: '14c105708c2bc14ab96036a0f3ad90f2' },
				{ url: '/privacy.pdf', revision: '2788c1624a55425b89899f6a4ee40a0c' },
				{ url: '/robots.txt', revision: '3ad0652bd17ff826a31fa29366021cfd' },
				{ url: '/terms.pdf', revision: '77a7a846d3ad825461980e8deea27722' },
			],
			{ ignoreURLParametersMatching: [] }
		),
		s.cleanupOutdatedCaches(),
		s.registerRoute(
			'/',
			new s.NetworkFirst({
				cacheName: 'start-url',
				plugins: [
					{
						cacheWillUpdate: async ({ request: s, response: e, event: n, state: i }) =>
							e && 'opaqueredirect' === e.type
								? new Response(e.body, { status: 200, statusText: 'OK', headers: e.headers })
								: e,
					},
				],
			}),
			'GET'
		),
		s.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new s.CacheFirst({
				cacheName: 'google-fonts-webfonts',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new s.StaleWhileRevalidate({
				cacheName: 'google-fonts-stylesheets',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new s.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new s.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new s.StaleWhileRevalidate({
				cacheName: 'next-image',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			/\.(?:mp3|mp4)$/i,
			new s.StaleWhileRevalidate({
				cacheName: 'static-media-assets',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			/\.(?:js)$/i,
			new s.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			/\.(?:css|less)$/i,
			new s.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new s.StaleWhileRevalidate({
				cacheName: 'next-data',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new s.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			({ url: s }) => {
				if (!(self.origin === s.origin)) return !1
				const e = s.pathname
				return !e.startsWith('/api/auth/') && !!e.startsWith('/api/')
			},
			new s.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			({ url: s }) => {
				if (!(self.origin === s.origin)) return !1
				return !s.pathname.startsWith('/api/')
			},
			new s.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		),
		s.registerRoute(
			({ url: s }) => !(self.origin === s.origin),
			new s.NetworkFirst({
				cacheName: 'cross-origin',
				networkTimeoutSeconds: 10,
				plugins: [
					new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600, purgeOnQuotaError: !0 }),
				],
			}),
			'GET'
		)
})
