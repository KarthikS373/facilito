import { createContext, Context } from 'react'

// KEYS
const defContext: FormInputProps = {
	required: false,
	background: '',
	helper: '',
	color: '',
	label: '',
	name: '',
	text: '',
	id: 0,
}

// CONTEXTO
const FormContext: Context<FormInputProps> = createContext<FormInputProps>(defContext)
export default FormContext
