// REACT
import React, { useState, useRef, useContext } from 'react'

// NEXT
import dynamic from 'next/dynamic'

// ESTILOS
import Styles from './style.module.scss'

// HOOKS
import { useCompanyProducts } from 'hooks/business'
import useStrings from 'hooks/lang'

// TOOLS
import { formHasComponent, getCouponProducts, sendForm, setGeoComponents } from './tools'
import { defThemeColors, generateTheme } from 'utils/tools'

// PROVIDERS
import { ThemeProvider } from '@mui/material/styles'
import AlertProvider from 'providers/alerts'

// COMPONENTES
import FormHeader from 'components/formHeader'

// CONTEXT
import AuthContext from 'context/auth'
import usePaletteColors from 'hooks/theme'

// FORM
const HookForm = dynamic(() => import('./components/form'))

// PROPS
interface FormProps {
	company: Business | null
	formData: Form | null
	companyURL: string
	formURL: string
}

const FormView: React.FC<FormProps> = ({ company, formData, companyURL, formURL }: FormProps) => {
	// USUARIO
	const { userExists, user } = useContext(AuthContext)

	// STRINGS
	const { $ } = useStrings()

	// PRODUCTOS
	const [products, setProducts] = useState<Product[] | null>(null)

	// COLORES
	const [defColors, setDefColors] = useState<string[]>(defThemeColors)

	// REFERENCIAS
	const geoRef: React.MutableRefObject<FormAnswerItemContainer | never> = useRef({})

	// USAR PRODUCTOS CON CUPONES
	const coupons = getCouponProducts(formData?.components.map((component) => component.coupons))

	// TIENE PRODUCTOS
	const hasProducts = formHasComponent(formData?.components, 'products')

	// GEO POSICIONES
	setGeoComponents(formData?.components, geoRef)

	// USAR PRODUCTOS
	useCompanyProducts(setProducts, userExists, company?.id || null, hasProducts)

	// COLORERS
	usePaletteColors(setDefColors, formData?.background ?? '')

	// ENVIAR TIENDA
	const sendFormEvent = (data: Record<string, unknown>, reset: EmptyFunction) =>
		sendForm($, data, reset, formData, company, defColors, geoRef, formURL, companyURL)

	if (formData?.public || (!formData?.public && !user?.isAnonymous))
		return (
			<ThemeProvider theme={generateTheme(defColors)}>
				<AlertProvider />
				<div
					className={Styles.container}
					style={
						{
							'--primary': defColors[0],
							'--secondary': defColors[1],
							'--primaryDark': defColors[0],
							'--secondaryDark': defColors[3],
						} as React.CSSProperties
					}>
					<div className={Styles.viewContent}>
						{/* HEADER */}
						<FormHeader
							formDescription={formData?.description}
							banner={formData?.banner || ''}
							company={company || undefined}
							formTitle={formData?.title}
							previewMode
							clientMode
						/>

						{/* TIENDA */}
						{formData && (
							<HookForm
								permissions={company?.permissions}
								sendFormEvent={sendFormEvent}
								couponProducts={coupons}
								formData={formData}
								products={products}
							/>
						)}
					</div>
				</div>
			</ThemeProvider>
		)
	else return <></>
}

export default FormView
