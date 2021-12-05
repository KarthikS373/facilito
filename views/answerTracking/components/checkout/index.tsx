import React from 'react'

// COMPONENTES
import FormSummary from 'views/form/components/form/components/formSummary'
import CompanyView from 'views/company'

// UTILS
import getSubTotal, { getCoupons, getProducts, getSummaryData } from './tools'
import { transformBackground } from 'utils/tools'
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

interface Checkout {
	company: Business | null
	data?: FormAnswerTracking
	formData: Form | null
}
const Checkout: React.FC<Checkout> = ({ company, formData, data }) => {
	// STRINGS
	const { $ } = useStrings()

	// FONDO
	const background = transformBackground(company?.background || company?.backgroundImage)

	// OBTENER SUBTOTAL
	const total: number = getSubTotal(data)

	// CUPONES
	const coupons = getCoupons(data)

	// PRODUCTOS
	const productos = getProducts(data)

	// DATOS DE ENVIO
	const summaryData = getSummaryData($, data)

	return (
		<div style={{ background }} className={Styles.container}>
			<CompanyView company={company} forms={[]} hideForms />
			<div className={Styles.summary}>
				<FormSummary
					formData={formData ?? undefined}
					defSummaryData={summaryData}
					clickOnSubmit={() => null}
					formProducts={productos}
					formCoupons={coupons}
					setValue={() => null}
					productsCounter={[0]}
					subTotalPrice={total}
					isSubmitting={false}
					cartItems={0}
					preview
				/>
			</div>
		</div>
	)
}

export default Checkout
