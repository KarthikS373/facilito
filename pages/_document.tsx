/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import React from 'react'

// NEXT
import Document, { Html, Head, Main, NextScript } from 'next/document'

// DOCUMENTO
class FacilitoDoc extends Document {
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
	const { default: createEmotionServer } = await import('@emotion/server/create-instance')
	const { default: createEmotionCache } = await import('providers/theme/emotion')

	const originalRenderPage = ctx.renderPage
	const cache = createEmotionCache()
	const { extractCriticalToChunks } = createEmotionServer(cache)

	ctx.renderPage = () =>
		originalRenderPage({
			// @ts-ignore
			enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
		})

	const initialProps = await Document.getInitialProps(ctx)
	const emotionStyles = extractCriticalToChunks(initialProps.html)
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
		/>
	))

	return {
		...initialProps,
		styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
	}
}

export default FacilitoDoc
