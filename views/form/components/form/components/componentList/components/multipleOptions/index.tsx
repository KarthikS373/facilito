// REACT
import React, { useContext, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import InfoOutlined from '@mui/icons-material/InfoOutlined'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import type { CheckboxProps, RadioProps } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'

// CONTEXTO
import FormContext from '../../context'

// HOOKS
import { setComponentValue, useComponentRegister } from '../../hooks'
import useStrings from 'hooks/lang'
import onCheckChange from './tools'

// PROPIEDADES
interface OptionsComponent {
	InputElement?: React.FC<CheckboxProps | RadioProps>
	isRadio?: boolean
}

const FormMultipleOptions: React.FC<OptionsComponent> = (eProps: OptionsComponent) => {
	// ESTADO PARA CHECKBOX
	const [checks, setChecks] = useState<string[] | undefined>(undefined)

	// FORM PROPS
	const props = useContext(FormContext)

	// STRINGS
	const id = `${props.name}_${props.id}`

	// STRINGS
	const { $ } = useStrings()

	// REGISTRAR COMPONENTE
	useComponentRegister(props.register, props.name, props.id, { required: props.required })

	// CAMBIO EN CHECKBOX
	const onCheckChangeEv = (label: string) => () =>
		onCheckChange(label, id, setChecks, props.setValue)

	return (
		<>
			<FormControl variant={!eProps.InputElement ? 'outlined' : undefined}>
				{props.label && <h3 className={Styles.optionsLabel}>{props.label}</h3>}
				{eProps.isRadio ? (
					<>
						<RadioGroup
							id={id}
							name={id}
							className={Styles.formGroup}
							onChange={setComponentValue(props.setValue, props.name, props.id)}>
							{props.values &&
								props.values.map(
									(label: string, key: number) =>
										eProps.InputElement && (
											<FormControlLabel
												control={<eProps.InputElement color='primary' />}
												name={`${props.name}_item_${props.id}_${key}`}
												key={`${props.name}_item_${props.id}_${key}`}
												id={`${props.name}_item_${props.id}_${key}`}
												value={label}
												label={label}
											/>
										)
								)}
						</RadioGroup>
						<FormHelperText error={props.error} className={Styles.helperOrError}>
							{props.error && <InfoOutlined />}{' '}
							{props.error ? $`Este campo es obligatorio` : props.helper}
						</FormHelperText>
					</>
				) : eProps.InputElement ? (
					<>
						<FormGroup id={id} className={Styles.formGroup}>
							{props.values &&
								props.values.map(
									(label: string, key: number) =>
										eProps.InputElement && (
											<FormControlLabel
												control={
													<eProps.InputElement
														checked={checks ? checks.indexOf(label) !== -1 : false}
														onChange={onCheckChangeEv(label)}
														color='primary'
													/>
												}
												key={`${props.name}_item_${props.id}_${key}`}
												label={label}
												name={id}
												id={id}
											/>
										)
								)}
						</FormGroup>
						<FormHelperText error={props.error} className={Styles.helperOrError}>
							{props.error && <InfoOutlined />}{' '}
							{props.error ? $`Este campo es obligatorio` : props.helper}
						</FormHelperText>
					</>
				) : (
					<>
						<Select
							id={id}
							name={id}
							defaultValue=''
							error={props.error}
							className={Styles.selectBox}
							onChange={
								setComponentValue(props.setValue, props.name, props.id) as (
									event: SelectChangeEvent<string>,
									child: React.ReactNode
								) => void
							}>
							{props.values &&
								props.values.map((option: string, key: number) => (
									<MenuItem key={`${id}_option_${key}`} value={option}>
										{option}
									</MenuItem>
								))}
						</Select>
						<FormHelperText error={props.error} className={Styles.helperOrError}>
							{props.error && <InfoOutlined />} {props.helper}
						</FormHelperText>
					</>
				)}
			</FormControl>
		</>
	)
}

export default FormMultipleOptions