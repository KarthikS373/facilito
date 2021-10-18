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
import { generateTheme, splitBackgroundColors } from 'utils/tools'

// PROVIDERS
import { ThemeProvider } from '@mui/material/styles'

// COMPONENTES
import FormHeader from 'components/formHeader'

// CONTEXT
import AuthContext from 'context/auth'

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
	const { userExists } = useContext(AuthContext)

	// STRINGS
	const { $ } = useStrings()

	// PRODUCTOS
	const [products, setProducts] = useState<Product[] | null>(null)

	// REFERENCIAS
	const geoRef: React.MutableRefObject<FormAnswerItemContainer | never> = useRef({})

	// USAR PRODUCTOS CON CUPONES
	const coupons = getCouponProducts(formData?.components.map((component) => component.coupons))

	// COLORES POR DEFECTO
	const defColors = splitBackgroundColors(formData ? formData.background : '')
	const customTheme = generateTheme(defColors)

	// TIENE PRODUCTOS
	const hasProducts = formHasComponent(formData?.components, 'products')

	// GEO POSICIONES
	setGeoComponents(formData?.components, geoRef)

	// USAR PRODUCTOS
	useCompanyProducts(setProducts, userExists, company?.id || null, hasProducts)

	// ENVIAR FORMULARIO
	const sendFormEvent = (data: { [id: string]: unknown }, reset: EmptyFunction) =>
		sendForm($, data, reset, formData, company, defColors, geoRef, formURL, companyURL)

	return (
		<ThemeProvider theme={customTheme}>
			<div
				className={Styles.container}
				style={
					{
						'--primary': defColors[0],
						'--secondary': defColors[1],
						'--primaryDark': defColors[0],
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

					{/* FORMULARIO */}
					{formData && (
						<HookForm
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
}

export default FormView
