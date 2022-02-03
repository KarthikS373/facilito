import React from 'react'

// COMPONENTES
import { AnswerPreview } from 'views/answers/components/answersList/components/showAnswer'
import FormSummary from 'views/form/components/form/components/formSummary'
import CompanyView from 'views/company'

// UTILS
import getSubTotal, { getCoupons, getProductsAnswer, getSummaryData } from './tools'
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

	// DATOS DE ENVIO
	const summaryData = getSummaryData($, data)

	return (
		<div style={{ background }} className={Styles.container}>
			<CompanyView company={company} forms={[]} hideForms />
			<div className={Styles.info}>
				{data?.data.personal_name_0 && (
					<div className={Styles.row}>
						<span>👨 {data?.data.personal_name_0?.answer}</span>
					</div>
				)}
				{data?.data.personal_phone_0 && (
					<div className={Styles.row}>
						<span>📞 {data?.data.personal_phone_0?.answer}</span>
					</div>
				)}
				{data?.data.personal_email_0 && (
					<div className={Styles.row}>
						<span>📮 {data?.data.personal_email_0?.answer}</span>
					</div>
				)}
				{data?.data.personal_address_0 && (
					<div className={Styles.row}>
						<span>📪 {data?.data.personal_address_0?.answer}</span>
					</div>
				)}
				{data?.data.personal_instructions_0 && (
					<div className={Styles.row}>
						<span>🔍 {data?.data.personal_instructions_0?.answer}</span>
					</div>
				)}
			</div>

			<div className={Styles.cart}>
				<AnswerPreview preview answers={getProductsAnswer(formData?.components, data?.data)} />
			</div>
			<div className={Styles.summary}>
				<FormSummary
					formData={formData ?? undefined}
					defSummaryData={summaryData}
					clickOnSubmit={() => null}
					formCoupons={coupons}
					setValue={() => null}
					productsCounter={[0]}
					subTotalPrice={total}
					isSubmitting={false}
					formProducts={{}}
					cartItems={0}
					preview
				/>
			</div>
		</div>
	)
}

export default Checkout
