// TIPOS
import { AppProps } from 'next/app'

// PROVIDERS
import ProtectedRoutesProvider from 'router/provider'
import BusinessProvider from 'providers/business'
import PortrayProvider from 'providers/lang'
import AlertProvider from 'providers/alerts'
import ThemeProvider from 'providers/theme'
import UserProvider from 'providers/user'

// COMPONENTS
import Layout from 'components/layout'

// CSS
import CssBaseline from '@material-ui/core/CssBaseline'

// UTILS
import useRemoveSSRStyles from 'hooks/theme'

// ESTILOS GLOBALES
import 'styles/normalize.css'
import 'styles/globals.scss'
import 'styles/mixins.scss'

const FacilitoApp = ({ Component, pageProps }: AppProps) => {
	// QUITAR ESTILOS SSR DE MATERIAL
	useRemoveSSRStyles()

	return (
		<ThemeProvider>
			<UserProvider>
				<BusinessProvider>
					<ProtectedRoutesProvider>
						<PortrayProvider settings={{ mainLang: 'es' }}>
							<AlertProvider />
							<Layout>
								<CssBaseline />
								<Component {...pageProps} />
							</Layout>
						</PortrayProvider>
					</ProtectedRoutesProvider>
				</BusinessProvider>
			</UserProvider>
		</ThemeProvider>
	)
}

export default FacilitoApp
