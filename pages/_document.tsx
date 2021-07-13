/* eslint-disable react/jsx-filename-extension */
import React from 'react'

// NEXT
import Document, { Html, Head, Main, NextScript } from 'next/document'

// MATERIAL
import { ServerStyleSheets } from '@material-ui/core/styles'

// DOCUMENTO
export default class FacilitoDoc extends Document {
	render() {
		return (
			<Html lang='es'>
				<Head>
					<meta name='theme-color' content='#000' />
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
