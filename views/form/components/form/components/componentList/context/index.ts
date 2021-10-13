import { createContext, Context } from 'react'

// REACT HOOK FORM
import type { UseFormSetValue, UseFormRegister, FieldValues } from 'react-hook-form'

// KEYS
export interface FormContextProps extends BlockComponent {
	[index: string]: unknown
	formProducts: FormDataProductSliderAnswer | undefined
	setValue: UseFormSetValue<FieldValues> | null
	register: UseFormRegister<FieldValues> | null
	onDate?: (ev: Date | null) => unknown
	allowProductDropdown: boolean
	couponProducts: string[]
	productsList: Product[]
	showcaseMode: boolean
	error: boolean
	badge: string
}

const defContext: FormContextProps = {
	allowProductDropdown: false,
	formProducts: undefined,
	showcaseMode: false,
	couponProducts: [],
	productsList: [],
	required: false,
	setValue: null,
	background: '',
	register: null,
	error: false,
	helper: '',
	color: '',
	label: '',
	badge: '',
	name: '',
	text: '',
	id: 0,
}

// CONTEXTO
const FormContext: Context<FormContextProps> = createContext<FormContextProps>(defContext)
export default FormContext
