// REACT
import React, { useState, useRef } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// HOOKS
import useBusiness, { useCompanyProducts } from 'hooks/business'
import { useFormBackground } from 'hooks/forms'

// TOOLS
import { formHasComponent, getCouponProducts, setGeoComponents } from './utils/tools'
import { generateTheme, splitBackgroundColors } from 'utils/tools'

// PROVIDERS
import ThemeProvider from '@mui/styles/ThemeProvider'

// COMPONENTES
import FormHeader from 'components/formHeader'
import HookForm from './components/form'

// PROPS
interface FormProps {
	companyID: string | null
	formData: Form | null
	companyURL: string
	formURL: string
}

const FormView: React.FC<FormProps> = ({ companyID, formData }: FormProps) => {
	// EMPRESA
	const [formCompany, setFormCompany] = useState<Business | null>(null)

	// PRODUCTOS
	const [products, setProducts] = useState<Product[]>([])

	// REFERENCIAS
	const geoRef: React.MutableRefObject<FormAnswerItemContainer | never> = useRef({})

	// USAR PRODUCTOS CON CUPONES
	const coupons = getCouponProducts(formData?.components.map((component) => component.coupons))

	// COLORES POR DEFECTO
	const defColors = splitBackgroundColors(formData ? formData.background : '')
	const customTheme = generateTheme(defColors)

	// COLOR DE FONDO
	useFormBackground(formData?.background)

	// LEER EMPRESA
	useBusiness(companyID, formHasComponent(formData?.components, 'product'), setFormCompany)

	// GEO POSICIONES
	setGeoComponents(formData?.components, geoRef)

	// USAR PRODUCTOS
	useCompanyProducts(setProducts, true, companyID || undefined)

	// ENVIAR FORMULARIO
	const sendFormEvent = (data: unknown, reset: () => unknown) => {
		console.log(data, reset)
	}

	return (
		<ThemeProvider theme={customTheme}>
			<div className={Styles.container}>
				<div className={Styles.viewContent}>
					{/* HEADER */}
					<FormHeader
						formDescription={formData?.description}
						company={formCompany || undefined}
						banner={formData?.banner || ''}
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
