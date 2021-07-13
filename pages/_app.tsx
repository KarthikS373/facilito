// TIPOS
import { useEffect } from 'react'
import { AppProps } from 'next/app'

// PROVIDERS
import ProtectedRoutesProvider from 'router/provider'
import BusinessProvider from 'providers/business'
import PortrayProvider from 'providers/lang'
import ThemeProvider from 'providers/theme'
import UserProvider from 'providers/user'

// COMPONENTS
import AlertTemplate from 'components/lualert'

// CSS
import CssBaseline from '@material-ui/core/CssBaseline'

// STRINGS
import Strings from 'lang/strings.json'

// ESTILOS GLOBALES
import 'styles/normalize.css'
import 'styles/globals.css'

const FacilitoApp = ({ Component, pageProps }: AppProps) => {
	// ALERTA VACIÁ
	const emptyAlert = () => {}

	// QUITAR ESTILOS SSR DE MATERIAL
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
	}, [])

	return (
		<ThemeProvider>
			<UserProvider>
				<BusinessProvider>
					<ProtectedRoutesProvider>
						<PortrayProvider strings={Strings} settings={{ mainLang: 'es' }}>
							<AlertTemplate
								ref={(AlertRef) => {
									window.Alert = AlertRef?.show || emptyAlert
									window.hideAlert = AlertRef?.forceHide || emptyAlert
								}}
							/>
							<CssBaseline />
							<Component {...pageProps} />
						</PortrayProvider>
					</ProtectedRoutesProvider>
				</BusinessProvider>
			</UserProvider>
		</ThemeProvider>
	)
}

export default FacilitoApp
