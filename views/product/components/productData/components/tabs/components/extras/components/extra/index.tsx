// REACT
import React, { useEffect, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'

// COMPONENTES
import Option from './components/option'

// ICONOS
import FormatColorTextTwoToneIcon from '@mui/icons-material/FormatColorTextTwoTone'
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone'
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'
import AddTwoTone from '@mui/icons-material/AddTwoTone'

// HOOKS
import useStrings from 'hooks/lang'

// UTILS
import changeExtraProps, { addOptional, removeOptional, changeType } from './tools'

interface ExtraProps {
	extra: Extra
	index: number
	deleteExtra: EmptyFunction
	productRef: React.MutableRefObject<Product>
}

enum ExtraType {
	ONLY,
	MULTIPLE,
	AMOUNT,
}

interface ExtendedOpt extends ExtraOptional {
	id: number
}

const Extra: React.FC<ExtraProps> = ({ extra, index, productRef, deleteExtra }) => {
	// STRINGS
	const { $ } = useStrings()

	// GUARDAR
	const onChangeExtra = (ev: React.ChangeEvent<HTMLInputElement>) =>
		changeExtraProps(ev, index, productRef)

	// OPCIONES
	const [options, setOptions] = useState<ExtendedOpt[]>([])

	// TIPO DE EXTRA
	const [extraType, setExtraType] = useState<number>(extra.type || 0)

	// CAMBIAR OBLIGATORIO
	const toggleRequiredEv = (ev: React.ChangeEvent<HTMLInputElement>) => {
		if (productRef.current.extras) productRef.current.extras[index].required = !ev.target.checked
	}

	// CAMBIAR TIPO
	const changeTypeEv = (ev: SelectChangeEvent<string>) =>
		changeType(index, ev, productRef, setExtraType)

	// AGREGAR OPCION
	const addOptionalEv = (optionIndex: number) => () =>
		addOptional(index, optionIndex, productRef, setOptions)

	// REMOVER OPCION
	const removeOptionalEv = (optionIndex: number) => () =>
		removeOptional(index, optionIndex, productRef, setOptions)

	// AGREGAR OPCIONES INICIALES
	useEffect(() => {
		setOptions(extra.options?.map((option: ExtraOptional, id: number) => ({ ...option, id })) || [])
	}, [extra.options])

	return (
		<div className={Styles.container}>
			<div
				className={Styles.row}
				style={{ gridTemplateColumns: `auto ${extraType === 0 ? '' : 'auto'} auto` }}>
				<TextField
					type='text'
					name='title'
					color='primary'
					label={$`Titulo`}
					variant='outlined'
					defaultValue={extra.title}
					onChange={onChangeExtra}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<FormatColorTextTwoToneIcon color='primary' />
							</InputAdornment>
						),
					}}
				/>
				{extraType !== 0 && (
					<TextField
						name='cant'
						type='number'
						color='primary'
						variant='outlined'
						label={$`Cantidad`}
						style={{ width: 100 }}
						onChange={onChangeExtra}
						defaultValue={extra.cant}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<ListAltTwoToneIcon color='primary' />
								</InputAdornment>
							),
						}}
					/>
				)}
				<FormControl fullWidth variant='outlined'>
					<InputLabel htmlFor='category' id='category-label'>{$`Tipo de variable`}</InputLabel>
					<Select
						id='type'
						name='type'
						color='primary'
						variant='outlined'
						labelId='type-label'
						onChange={changeTypeEv}
						value={extraType.toString()}
						label={$`Tipo de variable`}>
						<MenuItem key='only' value={ExtraType.ONLY}>
							{$`Seleccion unica`}
						</MenuItem>
						<MenuItem key='multiple' value={ExtraType.MULTIPLE}>
							{$`Seleccion multiple`}
						</MenuItem>
						<MenuItem key='amount' value={ExtraType.AMOUNT}>
							{$`Por cantidad`}
						</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className={Styles.options}>
				<div className={Styles.actions}>
					<Button
						variant='outlined'
						startIcon={<AddTwoTone />}
						onClick={addOptionalEv(options.length - 1)}>
						{$`Agregar opcion`}
					</Button>
					<IconButton onClick={deleteExtra}>
						<DeleteTwoTone />
					</IconButton>
				</div>
				<FormControlLabel
					control={
						<Switch
							name='required'
							color='primary'
							onChange={toggleRequiredEv}
							defaultChecked={extra.required}
						/>
					}
					label={$`Obligatorio`}
				/>
			</div>

			{/* OPCIONES */}
			<div className={Styles.optionsList}>
				{options.map((option: ExtendedOpt, optIndex: number) => (
					<Option
						option={option}
						key={`opt_${option.id}`}
						extraIndex={index}
						optionIndex={optIndex}
						productRef={productRef}
						addOptional={addOptionalEv(optIndex)}
						removeOptional={removeOptionalEv(optIndex)}
					/>
				))}
			</div>
		</div>
	)
}

export default Extra
