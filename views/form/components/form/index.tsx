// REACT
import React, { useRef } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Button from '@mui/material/Button'

// COMPONENTES
import FormComponentsList from './components/componentList'
import FormSearch from './components/formSearch'

// REACT-HOOK-FORM
import { useForm } from 'react-hook-form'

// TOOLS
import cleanFormData from './tools'
import { formHasComponent } from 'views/form/tools'

// HOOKS
import useStrings from 'hooks/lang'

// PROPIEDADES
interface HookFormProps {
	sendFormEvent: (data: unknown, reset: () => unknown) => void
	formData: Form | undefined
	couponProducts: string[]
	products: Product[]
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
	const onSubmit = (data: unknown) => props.sendFormEvent(cleanFormData(data), clearErrors)

	// REFERENCIA DE BOTÓN DE ENVIAR
	const submitButton: React.RefObject<HTMLButtonElement> = useRef(null)

	// CONTIENE PRODUCTOS
	const haveProducts: boolean = formHasComponent(props.formData?.components, 'product')

	if (props.formData) {
		// ALERTA DE OBLIGATORIOS
		const onError = () => window.Alert({ title: 'Error', body: 'Error', type: 'error' })

		// LISTENER DE PRODUCTOS
		const formProducts = haveProducts
			? (watch('products', {}) as FormDataProductSliderAnswer | undefined)
			: undefined

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
							className={Styles.search}
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
				</div>

				{/* BOTÓN DE ENVIAR */}
				<Button
					type='submit'
					color='primary'
					ref={submitButton}
					variant='contained'
					disabled={isSubmitting}
					className={Styles.submit}>
					{$`Enviar`}
				</Button>
			</form>
		)
	} else return <></>
}

export default HookForm
