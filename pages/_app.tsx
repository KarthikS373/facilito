// TIPOS
import { AppProps } from 'next/app'

// PROVIDERS
import ProtectedRoutesProvider from 'router/provider'
import { ThemeProvider } from '@material-ui/core'
import BusinessProvider from 'providers/business'
import UserProvider from 'providers/user'
import { theme } from 'providers/theme'

// ESTILOS GLOBALES
import 'styles/normalize.css'
import 'styles/globals.css'

const FacilitoApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<BusinessProvider>
					<ProtectedRoutesProvider>
						<Component {...pageProps} />
					</ProtectedRoutesProvider>
				</BusinessProvider>
			</UserProvider>
		</ThemeProvider>
	)
}

export default FacilitoApp
