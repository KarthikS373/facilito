// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// REACT HOOK FORM
import { UseFormSetValue, UseFormRegister, DeepMap, FieldValues, FieldError } from 'react-hook-form'

// COMPONENTES
import PhoneField from 'components/phoneInput'
import TextInput from '../textInput'

// HOOKS
import { useComponentRegister } from '../../hooks'
import useStrings from 'hooks/lang'

// HELPERS
import getPersonalStrings, { getLabelsAndHelpers } from './tools'
import FormContext from '../../context'

interface PersonalInputsProps {
	errors: DeepMap<FieldValues, FieldError>
	setValue: UseFormSetValue<FieldValues>
	register: UseFormRegister<FieldValues>
	personalOptions: FormPersonalData
}

const PersonalInputs: React.FC<PersonalInputsProps> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	// INPUTS
	const personalOptions: [boolean[], string[]] = getPersonalStrings(props.personalOptions)
	const fields = getLabelsAndHelpers($)

	// ENVIAR PHONE
	const onChangePhone = (value: string) => props.setValue('personal_phone_0', value)

	// REGISTRAR NUMERO DE TELÉFONO
	useComponentRegister(props.register, 'personal_phone', 0, {
		required: props.personalOptions.phone,
	})

	return (
		<>
			<div className={Styles.container}>
				<div className={Styles.content}>
					{/* INPUT DE NOMBRE */}
					<FormContext.Provider
						value={{
							helper:
								'personal_name_0' in props.errors
									? $`El nombre es obligatorio`
									: $`Escribe tu nombre`,
							error: 'personal_name_0' in props.errors,
							label: $`Nombre`,
							allowProductDropdown: false,
							setValue: props.setValue,
							register: props.register,
							formProducts: undefined,
							name: 'personal_name',
							showcaseMode: false,
							couponProducts: [],
							productsList: [],
							required: true,
							background: '',
							color: '',
							text: '',
							id: 0,
						}}>
						<TextInput />
					</FormContext.Provider>
				</div>
			</div>

			{personalOptions[0].map((option: boolean, key: number) => {
				// INPUT DE TELÉFONO
				const name: string = personalOptions[1][key]
				if (name === 'personal_phone_0' && option)
					return (
						<div
							className={Styles.container}
							style={{ marginTop: '0px', display: option ? 'block' : 'none' }}
							key={name}>
							<div className={Styles.content}>
								<PhoneField
									name={name}
									required={option}
									variant='standard'
									onChange={onChangePhone}
									error={name in props.errors}
									label={$`Número de teléfono`}
									helperText={
										name in props.errors ? $`Campo obligatorio` : $`Recuerda agregar la extensión`
									}
								/>
							</div>
						</div>
					)
				else if (option)
					// INPUTS RESTANTES
					return (
						<div
							className={Styles.container}
							style={{ marginTop: '0px', display: option ? 'block' : 'none' }}
							key={name}>
							<div className={Styles.content}>
								<FormContext.Provider
									value={{
										helper: name in props.errors ? $`Campo obligatorio` : fields.helpers[key - 1],
										type: key === 0 ? 'number' : key === 1 ? 'email' : 'text',
										label: fields.labels[key - 1],
										allowProductDropdown: false,
										error: name in props.errors,
										setValue: props.setValue,
										register: props.register,
										name: name.slice(0, -2),
										formProducts: undefined,
										showcaseMode: false,
										couponProducts: [],
										productsList: [],
										required: option,
										background: '',
										color: '',
										text: '',
										id: 0,
									}}>
									<TextInput />
								</FormContext.Provider>
							</div>
						</div>
					)
				else return null
			})}
		</>
	)
}

export default PersonalInputs
