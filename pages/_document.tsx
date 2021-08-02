/* eslint-disable react/jsx-filename-extension */
import React from 'react'

// NEXT
import Document, { Html, Head, Main, NextScript } from 'next/document'

// DOCUMENTO
export default class FacilitoDoc extends Document {
	render(): JSX.Element {
		return (
			<Html lang='es'>
				<Head>
					<meta
						name='application-name'
						content='Crea formularios avanzados, e-commerce y mucho más | Facilito'
					/>
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta name='apple-mobile-web-app-status-bar-style' content='default' />
					<meta
						name='apple-mobile-web-app-title'
						content='Crea formularios avanzados, e-commerce y mucho más | Facilito'
					/>
					<meta name='description' content='' />
					<meta name='format-detection' content='telephone=no' />
					<meta name='mobile-web-app-capable' content='yes' />
					<meta name='msapplication-TileColor' content='#1AA5BB' />
					<meta name='msapplication-tap-highlight' content='no' />
					<meta name='theme-color' content='#1AA5BB' />
					<link rel='apple-touch-icon' href='/images/icon.png' />
					<link rel='icon' type='image/png' href='/favicon.ico' />
					<link rel='manifest' href='/manifest.json' />
					<link rel='mask-icon' href='/images/maskable_icon.png' color='#1AA5BB' />
					<link rel='shortcut icon' href='/favicon.ico' />
					<meta property='og:type' content='website' />
					<meta
						property='og:title'
						content='Crea formularios avanzados, e-commerce y mucho más | Facilito'
					/>
					<meta property='og:description' content='' />
					<meta property='og:site_name' content='Facilito' />
					<meta property='og:url' content='https://https://facilito-release.web.app' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

FacilitoDoc.getInitialProps = async (ctx) => {
	// MOSTRAR PAGINA NORMAL
	const { ServerStyleSheets } = await import('@material-ui/core/styles')
	const sheets = new ServerStyleSheets()
	const originalRenderPage = ctx.renderPage

	// RENDER DE PAGINA INICIAL
	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		})

	// PROPS
	const initialProps = await Document.getInitialProps(ctx)
	return {
		...initialProps,
		styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
	}
}
