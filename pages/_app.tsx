// REACT
import React from 'react'

// TIPOS
import type { AppProps } from 'next/app'

// PROVIDERS
import PermissionsProvider from 'providers/permissions'
import BusinessProvider from 'providers/business'
import ProductsProvider from 'providers/products'
import PortrayProvider from 'providers/lang'
import ThemeProvider from 'providers/theme'
import FormsProvider from 'providers/forms'
import UserProvider from 'providers/user'
import AuthProvider from 'providers/auth'

// COMPONENTS
import Layout from 'components/layout'

// UTILS
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from 'providers/theme/emotion'
import useAnalytics from 'hooks/analytics'

// ESTILOS GLOBALES
import 'styles/normalize.css'
import 'styles/globals.scss'
import 'styles/mixins.scss'

// NEXT
import dynamic from 'next/dynamic'

const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'))
const GlobalSnack = dynamic(() => import('components/snackbar'))
const AlertProvider = dynamic(() => import('providers/alerts'))
const clientSideEmotionCache = createEmotionCache()

interface FacilitoAppProps extends AppProps {
	emotionCache?: EmotionCache
}

const FacilitoApp = ({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}: FacilitoAppProps): JSX.Element => {
	// ANALYTICS
	useAnalytics()

	return (
		<CacheProvider value={emotionCache}>
			<AuthProvider>
				<UserProvider>
					<BusinessProvider>
						<PermissionsProvider>
							<ThemeProvider>
								<FormsProvider>
									<ProductsProvider>
										<PortrayProvider settings={{ mainLang: 'es' }}>
											<AlertProvider />
											<GlobalSnack />
											<Layout>
												<CssBaseline />
												<Component {...pageProps} />
											</Layout>
										</PortrayProvider>
									</ProductsProvider>
								</FormsProvider>
							</ThemeProvider>
						</PermissionsProvider>
					</BusinessProvider>
				</UserProvider>
			</AuthProvider>
		</CacheProvider>
	)
}

export default FacilitoApp
