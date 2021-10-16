// REACT
import React from 'react'

// COMPONENTES
import PersonalInputs from './components/personalInputs'
import FormComponent from './components/formComponent'

// CONTEXTO
import FormContext from './context'

// REACT HOOK FORM
import { UseFormSetValue, UseFormRegister, DeepMap, FieldValues, FieldError } from 'react-hook-form'
import useStrings from 'hooks/lang'

// PROPS
interface FormComponentsLisProps {
	formProducts: FormDataProductSliderAnswer | undefined
	errors: DeepMap<FieldValues, FieldError>
	setValue: UseFormSetValue<FieldValues>
	register: UseFormRegister<FieldValues>
	productsList: Product[] | null
	couponProducts: string[]
	formData?: Form
}

const FormComponentsList: React.FC<FormComponentsLisProps> = (props: FormComponentsLisProps) => {
	// STRINGS
	const { $ } = useStrings()

	if (props.formData)
		return (
			<>
				{props.formData?.components.map((cProps: BlockComponent) => {
					const id = `${cProps.name}_${cProps.id}`
					if (cProps.name !== 'multiple') {
						// ERRORES
						let error: boolean = id in props.errors
						if (props.errors) {
							if (cProps.name.startsWith('products') && props.errors.products)
								error = id in props.errors.products
							if (cProps.name.startsWith('coupons') && props.errors.coupons)
								error = id in props.errors.coupons
						}

						// CONTEXTO DE COMPONENTES
						return (
							<FormContext.Provider
								key={id}
								value={{
									...cProps,
									allowProductDropdown: props.formData?.checkout?.allowSelectCategory || false,
									helper: error ? $`Campo obligatorio` : cProps.helper,
									showcaseMode: props.formData?.checkout?.showcaseMode || false,
									couponProducts: props.couponProducts,
									badge: props.formData?.badge || 'GTQ',
									productsList: props.productsList,
									formProducts: props.formProducts,
									setValue: props.setValue,
									register: props.register,
									error: error,
								}}>
								<FormComponent />
							</FormContext.Provider>
						)
					} else if (props.formData)
						// INPUTS DE DATOS PERSONALES
						return (
							<PersonalInputs
								personalOptions={props.formData?.includePersonalData}
								setValue={props.setValue}
								register={props.register}
								errors={props.errors}
								key={id}
							/>
						)
					else return <></>
				})}
			</>
		)
	else return <></>
}

export default FormComponentsList
