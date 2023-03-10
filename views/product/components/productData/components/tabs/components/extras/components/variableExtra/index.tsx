/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

// ICONOS
import FontDownloadTwoToneIcon from '@mui/icons-material/FontDownloadTwoTone'
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone'
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone'
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'

// HOOKS
import useStrings from 'hooks/lang'

interface ExtraProps {
	index: number
	option: EtendedExtraVariable
	removeOptional: EmptyFunction
	productRef: React.MutableRefObject<Product>
}

const VariableExtra: React.FC<ExtraProps> = ({ index, productRef, option, removeOptional }) => {
	// STRINGS
	const { $ } = useStrings()

	// CAMBIAR DATOS DE OPCION
	const onChangeOption = (ev: React.ChangeEvent<HTMLInputElement>) =>
		// @ts-ignore
		((productRef?.current?.variableExtras ?? [])[index][ev.target.name as keyof ExtraVariable] =
			ev.target.value)

	return (
		<div className={Styles.container}>
			<TextField
				name='name'
				type='text'
				color='primary'
				label={$`Nombre`}
				variant='outlined'
				defaultValue={option.name}
				onChange={onChangeOption}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<FontDownloadTwoToneIcon color='primary' />
						</InputAdornment>
					),
				}}
			/>

			<TextField
				name='price'
				type='number'
				color='primary'
				label={$`Precio`}
				variant='outlined'
				onChange={onChangeOption}
				defaultValue={option.price}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<LocalOfferTwoToneIcon color='primary' />
						</InputAdornment>
					),
				}}
			/>

			<TextField
				name='count'
				type='number'
				color='primary'
				label={$`Cantidad en stock`}
				variant='outlined'
				onChange={onChangeOption}
				defaultValue={option.count}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Inventory2TwoToneIcon color='primary' />
						</InputAdornment>
					),
				}}
			/>

			<IconButton onClick={removeOptional}>
				<DeleteTwoTone />
			</IconButton>
		</div>
	)
}

export default VariableExtra
