// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import type { MuiTextFieldProps } from '@mui/lab/internal/pickers/PureDateInput'
import TextField from '@mui/material/TextField'

// TOOLS
import { hourToString } from 'utils/tools'
import { FormContextProps } from '../../../../context'

// PROPS
const dateInput =
	(range: boolean, $: TemplateStrBuilder, props: FormContextProps) =>
	// eslint-disable-next-line react/display-name
	(startProps: MuiTextFieldProps, endProps?: MuiTextFieldProps): React.ReactElement =>
		range ? (
			<TextField
				{...startProps}
				variant='standard'
				className={Styles.textField}
				name={props.name + '_' + props.id}
				id={props.name + '_' + props.id}
				helperText={
					props.error
						? props.time
							? $`Ingresa una fecha valida entre {{ from }} a {{ to }}`
									.replace('{{ from }}', hourToString(props.time[0]))
									.replace('{{ to }}', hourToString(props.time[1]))
							: props.helper
						: props.helper || undefined
				}
			/>
		) : (
			<>
				<TextField
					{...startProps}
					label={$`Desde`}
					variant='standard'
					className={Styles.textField}
					id={props.name + '_' + props.id + '_from'}
					name={props.name + '_' + props.id + '_from'}
					helperText={
						props.error
							? props.time
								? $`Ingresa una fecha valida entre {{ from }} a {{ to }}`
										.replace('{{ from }}', hourToString(props.time[0]))
										.replace('{{ to }}', hourToString(props.time[1]))
								: props.helper
							: props.helper || undefined
					}
				/>
				<span className={Styles.divisor}>-</span>
				<TextField
					{...endProps}
					label={$`Hasta`}
					variant='standard'
					helperText={undefined}
					className={Styles.textField}
					id={props.name + '_' + props.id + '_to'}
					name={props.name + '_' + props.id + '_to'}
				/>
			</>
		)

export default dateInput
