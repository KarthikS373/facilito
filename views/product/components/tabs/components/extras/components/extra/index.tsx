// REACT
import React, { useEffect, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

// COMPONENTES
import Option from './components/option'

// ICONOS
import FormatColorTextTwoToneIcon from '@material-ui/icons/FormatColorTextTwoTone'
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import AddTwoTone from '@material-ui/icons/AddTwoTone'

// HOOKS
import useStrings from 'hooks/lang'

// UTILS
import changeExtraProps, {
	addOptional,
	removeOptional,
	toggleRequired,
	changeType,
} from './utils/tools'

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
	const onChgangeExtra = (ev: React.ChangeEvent<HTMLInputElement>) =>
		changeExtraProps(ev, index, productRef)

	// OPCIONES
	const [options, setOptions] = useState<ExtendedOpt[]>([])

	// OBLIGATORIO
	const [requiredSwitch, setRequiredSwitch] = useState<boolean>(extra.required)

	// TIPO DE EXTRA
	const [extraType, setExtraType] = useState<number>(extra.type || 0)

	// CAMBIAR OBLIGATORIO
	const toggleRequiredEv = () => toggleRequired(index, productRef, setRequiredSwitch)

	// CAMBIAR TIPO
	const changeTypeEv = (ev: React.ChangeEvent<HTMLSelectElement>) =>
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
	}, [])

	return (
		<div className={Styles.container}>
			<div
				className={Styles.row}
				style={{ gridTemplateColumns: `auto ${extraType == 0 ? '' : 'auto'} auto` }}>
				<TextField
					type='text'
					name='title'
					color='primary'
					label={$`Titulo`}
					variant='outlined'
					defaultValue={extra.title}
					onChange={onChgangeExtra}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<FormatColorTextTwoToneIcon color='primary' />
							</InputAdornment>
						),
					}}
				/>
				{extraType != 0 && (
					<TextField
						name='cant'
						type='number'
						color='primary'
						variant='outlined'
						label={$`Cantidad`}
						style={{ width: 100 }}
						onChange={onChgangeExtra}
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
						value={extraType}
						variant='outlined'
						labelId='type-label'
						onChange={changeTypeEv}
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
							checked={requiredSwitch}
							onChange={toggleRequiredEv}
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
