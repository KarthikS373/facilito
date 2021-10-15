// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// ICONOS
import InfoOutlined from '@mui/icons-material/InfoOutlined'

// HOOKS
import useStrings from 'hooks/lang'

// CONTEXTO
import FormContext from '../../context'

// HOOKS
import { setComponentValue, useComponentRegister } from '../../hooks'

const Coupon: React.FC = () => {
	// FORM PROPS
	const props = useContext(FormContext)

	// ID
	const id = `${props.name}_${props.id}`

	// STRINGS
	const { $ } = useStrings()

	// REGISTRAR
	useComponentRegister(props.register, `coupons.${props.name}`, props.id, {
		required: props.required,
		validate: (value) => typeof value === 'string',
	})

	if (props.switch_1 && props.coupons?.length)
		return (
			<>
				{props.label && (
					<h3 className={Styles.optionsLabel} id={`${props.name}-${props.id}-select-label`}>
						{props.label}
					</h3>
				)}
				<FormControl variant='outlined'>
					<InputLabel id='coupon_selector'>{$`Seleccionar cupon`}</InputLabel>
					<Select
						id={id}
						name={id}
						fullWidth
						defaultValue=''
						error={props.error}
						label={$`Seleccionar cupon`}
						onChange={
							setComponentValue(props.setValue, `coupons.${props.name}`, props.id) as (
								event: SelectChangeEvent<string>
							) => void
						}>
						{props.coupons &&
							props.coupons.map((option: Coupon, key: number) => (
								<MenuItem key={`${id}_option_${key}`} value={option.id.toUpperCase()}>
									{option.id.toUpperCase()} -{' '}
									{option.type === 'discount' && `${option.percent}% ${$`de descuento`}`}
									{option.type === 'promo' &&
										`${option.factors ? option.factors[0] : 0}x${
											option.factors ? option.factors[1] : 0
										} ${$`en tu compra`}`}
								</MenuItem>
							))}
					</Select>
					<span className={Styles.helperOrError}>
						{props.error && <InfoOutlined />} {props.helper}
					</span>
				</FormControl>
			</>
		)
	else return <></>
}

export default Coupon
