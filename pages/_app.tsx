// TIPOS
import { useEffect } from 'react'
import { AppProps } from 'next/app'

// PROVIDERS
import ProtectedRoutesProvider from 'router/provider'
import { ThemeProvider } from '@material-ui/core'
import BusinessProvider from 'providers/business'
import UserProvider from 'providers/user'
import { theme } from 'providers/theme'

// CSS
import CssBaseline from '@material-ui/core/CssBaseline'

// ESTILOS GLOBALES
import 'styles/normalize.css'
import 'styles/globals.css'

const FacilitoApp = ({ Component, pageProps }: AppProps) => {
	// QUITAR ESTILOS SSR DE MATERIAL
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<BusinessProvider>
					<ProtectedRoutesProvider>
						<CssBaseline />
						<Component {...pageProps} />
					</ProtectedRoutesProvider>
				</BusinessProvider>
			</UserProvider>
		</ThemeProvider>
	)
}

export default FacilitoApp
