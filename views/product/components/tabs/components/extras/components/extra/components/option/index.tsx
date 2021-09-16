// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

// ICONOS
import FontDownloadTwoToneIcon from '@material-ui/icons/FontDownloadTwoTone'
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import AddTwoTone from '@material-ui/icons/AddTwoTone'

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
