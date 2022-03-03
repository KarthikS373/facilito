// REACT
import React, { useRef } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Button from '@mui/material/Button'

// ICONOS
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone'

// COMPONENTES
import FormComponentsList from './components/componentList'
import FormSummary from './components/formSummary'
import FormSearch from './components/formSearch'

// REACT-HOOK-FORM
import { useForm } from 'react-hook-form'

// TOOLS
import { formHasComponent } from 'views/form/tools'
import cleanFormData, { getProductsCounter, getSubtotalPrice } from './tools'

// HOOKS
import useStrings from 'hooks/lang'

// PROPIEDADES
interface HookFormProps {
	sendFormEvent: (data: Record<string, unknown>, reset: () => unknown) => void
	permissions?: CompanyPermissions
	formData: Form | undefined
	products: Product[] | null
	couponProducts: string[]
}

const HookForm: React.FC<HookFormProps> = (props: HookFormProps) => {
	// STRINGS
	const { $ } = useStrings()

	// HOOK FORM
	const {
		handleSubmit,
		setValue,
		register,
		watch,
		clearErrors,
		formState: { isSubmitting },
	} = useForm()

	// ENVIAR FORM
	const onSubmit = (data: Record<string, unknown>) =>
		props.sendFormEvent(cleanFormData(data), clearErrors)

	// REFERENCIA DE BOTÓN DE ENVIAR
	const submitButton: React.RefObject<HTMLButtonElement> = useRef(null)

	// BOTÓN DE SUBMIT 2
	const clickOnSubmit = () => submitButton.current && submitButton.current.click()

	// CONTIENE PRODUCTOS
	const haveProducts: boolean = formHasComponent(props.formData?.components, 'products')

	if (props.formData) {
		// ALERTA DE OBLIGATORIOS
		const onError = (err: unknown) => {
			console.log(err)
			window.Alert({
				title: 'Ocurrio un error',
				body: 'Es posible que algunos campos obligatorios esten vacios, por favor intenta nuevamente.',
				type: 'error',
			})
		}

		// LISTENER DE PRODUCTOS
		const formProducts = haveProducts
			? (watch('products', {}) as FormDataProductSliderAnswer | undefined)
			: undefined

		// LISTENER DE CUPONES
		const formCoupons = watch('coupons', {}) as FormDataCouponsAnswer | undefined

		// CALCULAR PRECIO TOTAL
		const subtotalPrice: number = getSubtotalPrice(formProducts)

		// CONTADOR DE PRODUCTOS
		const productsCounter: [number, number] = getProductsCounter(formProducts)

		return (
			<form onSubmit={handleSubmit(onSubmit, onError)} className={Styles.form}>
				<div>
					{/* BUSCADOR */}
					{haveProducts && props.formData?.checkout?.showSearch && (
						<FormSearch
							showCaseMode={props.formData.checkout.showcaseMode || false}
							components={props.formData?.components || []}
							formProducts={formProducts}
							products={props.products}
							setValue={setValue}
							register={register}
						/>
					)}

					{/* COMPONENTES */}
					<FormComponentsList
						couponProducts={props.couponProducts}
						productsList={props.products}
						formProducts={formProducts}
						formData={props.formData}
						setValue={setValue}
						register={register}
						errors={{}}
					/>

					{/* RESUMEN DE ORDEN */}
					{haveProducts && (
						<FormSummary
							productsCounter={productsCounter}
							permissions={props.permissions}
							cartItems={productsCounter[0]}
							subTotalPrice={subtotalPrice}
							clickOnSubmit={clickOnSubmit}
							formProducts={formProducts}
							isSubmitting={isSubmitting}
							formCoupons={formCoupons}
							formData={props.formData}
							setValue={setValue}
						/>
					)}
				</div>

				{/* BOTÓN DE ENVIAR */}
				<Button
					type='submit'
					color='primary'
					ref={submitButton}
					variant='contained'
					disabled={isSubmitting}
					className={Styles.submit}
					startIcon={<ReceiptTwoToneIcon />}>
					<span>{$`Enviar`}</span>
				</Button>
			</form>
		)
	} else return <></>
}

export default HookForm
