// REACT
import React from 'react'

// NEXT
import Head from 'next/head'

const MHead: React.FC = () => {
	// TITULO
	const title = 'Crea tiendas avanzadas, e-commerce y mucho más | Facilito'

	return (
		<Head>
			<title>{title}</title>
			<meta
				name='viewport'
				content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
			/>
			<meta name='application-name' content={title} />
			<meta name='apple-mobile-web-app-title' content={title} />
			<meta name='description' content='' />
			<meta name='msapplication-TileColor' content='#1AA5BB' />
			<meta name='theme-color' content='#1AA5BB' />
			<meta property='og:type' content='website' />
			<meta property='og:title' content={title} />
			<meta property='og:site_name' content='Facilito' />
			<meta property='og:url' content={`https://https://facilito-release.web.app/`} />
			<meta property='og:description' content='' />
		</Head>
	)
}

export default MHead
