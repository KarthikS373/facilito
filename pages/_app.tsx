// TIPOS
import { AppProps } from 'next/app'
import Head from 'next/head'

// PROVIDERS
import ProtectedRoutesProvider from 'router/provider'
import BusinessProvider from 'providers/business'
import ProductsProvider from 'providers/products'
import PortrayProvider from 'providers/lang'
import AlertProvider from 'providers/alerts'
import ThemeProvider from 'providers/theme'
import FormsProvider from 'providers/forms'
import UserProvider from 'providers/user'

// COMPONENTS
import Layout from 'components/layout'

// CSS
import CssBaseline from '@material-ui/core/CssBaseline'

// UTILS
import useRemoveSSRStyles from 'hooks/theme'
import useAnalytics from 'hooks/analytics'

// ESTILOS GLOBALES
import 'styles/normalize.css'
import 'styles/globals.scss'
import 'styles/mixins.scss'

const FacilitoApp = ({ Component, pageProps }: AppProps) => {
	// QUITAR ESTILOS SSR DE MATERIAL
	useRemoveSSRStyles()

	// ANALYTICS
	useAnalytics()

	return (
		<>
			<Head>
				<title>Crea formularios avanzados, e-commerce y mucho más | Facilito</title>
				<meta
					key='viewport'
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
				/>
			</Head>
			<ThemeProvider>
				<UserProvider>
					<BusinessProvider>
						<ProtectedRoutesProvider>
							<FormsProvider>
								<ProductsProvider>
									<PortrayProvider settings={{ mainLang: 'es' }}>
										<AlertProvider />
										<Layout>
											<CssBaseline />
											<Component {...pageProps} />
										</Layout>
									</PortrayProvider>
								</ProductsProvider>
							</FormsProvider>
						</ProtectedRoutesProvider>
					</BusinessProvider>
				</UserProvider>
			</ThemeProvider>
		</>
	)
}

export default FacilitoApp
