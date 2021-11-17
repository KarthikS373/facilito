/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import React from 'react'

// NEXT
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { resetServerContext } from 'react-beautiful-dnd'

// DOCUMENTO
class FacilitoDoc extends Document {
	render(): JSX.Element {
		return (
			<Html lang='es'>
				<Head>
					<meta name='author' content='LUA Development Studio - Alex Santos' />
					<meta name='apple-mobile-web-app-status-bar-style' content='default' />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta name='msapplication-tap-highlight' content='no' />
					<meta name='format-detection' content='telephone=no' />
					<meta name='mobile-web-app-capable' content='yes' />
					<meta name='MobileOptimized' content='yes' />
					<meta name='HandheldFriendly' content='yes' />

					<link rel='mask-icon' href='/images/maskable_icon.png' color='#1AA5BB' />
					<link rel='icon' type='image/png' href='/favicon.ico' />
					<link rel='apple-touch-icon' href='/images/icon.png' />
					<link rel='shortcut icon' href='/favicon.ico' />

					<meta property='fb:app_id' content='1335223056864131' />
					<link rel='manifest' href='/manifest.json' />
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
	resetServerContext()

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
