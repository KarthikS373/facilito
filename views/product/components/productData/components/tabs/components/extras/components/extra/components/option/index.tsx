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
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'
import AddTwoTone from '@mui/icons-material/AddTwoTone'

// HOOKS
import useStrings from 'hooks/lang'

// UTILS
import changeOptionProps from './utils/tools'

interface ExtraProps {
	option: ExtendedOpt
	extraIndex: number
	optionIndex: number
	productRef: React.MutableRefObject<Product>
	addOptional: EmptyFunction
	removeOptional: EmptyFunction
}

const Option: React.FC<ExtraProps> = ({
	option,
	extraIndex,
	optionIndex,
	productRef,
	addOptional,
	removeOptional,
}) => {
	// STRINGS
	const { $ } = useStrings()

	// CAMBIAR DATOS DE OPCION
	const onChangeOption = (ev: React.ChangeEvent<HTMLInputElement>) =>
		changeOptionProps(ev, extraIndex, optionIndex, productRef)

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
				defaultValue={option.price}
				onChange={onChangeOption}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<LocalOfferTwoToneIcon color='primary' />
						</InputAdornment>
					),
				}}
			/>

			<IconButton onClick={addOptional}>
				<AddTwoTone />
			</IconButton>
			<IconButton onClick={removeOptional}>
				<DeleteTwoTone />
			</IconButton>
		</div>
	)
}

export default Option
