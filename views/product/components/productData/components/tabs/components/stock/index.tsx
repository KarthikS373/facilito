// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import showInfo from './components/info'
import TabInfo from '../tabInfo'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'

// ICONS
import FingerprintTwoTone from '@mui/icons-material/FingerprintTwoTone'
import LocalOfferTwoTone from '@mui/icons-material/LocalOfferTwoTone'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'
import LayersTwoTone from '@mui/icons-material/LayersTwoTone'
import MoneyTwoTone from '@mui/icons-material/MoneyTwoTone'
import TollTwoTone from '@mui/icons-material/TollTwoTone'

// UTILS
import changeProductProps from '../../tools'

// HOOKS
import useStrings from 'hooks/lang'

// PROPS
interface GeneralProps {
	show: boolean
	productRef: React.MutableRefObject<Product>
}

const Stock: React.FC<GeneralProps> = ({ show, productRef }) => {
	// STRINGS
	const { $ } = useStrings()

	// ACTUALIZAR
	const handleInputs = (ev: BaseEvent) => changeProductProps(ev, productRef)

	// MOSTRAR INFORMACION
	const showStockInfo = () => showInfo($)

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TabInfo
				title={$`Caracteristicas en stock`}
				body={$`Esta informacion sera utilizada en el carrito, y en el resumen de compra en tus formularios.`}
			/>

			<div className={Styles.row}>
				<TextField
					id='price'
					name='price'
					type='number'
					variant='outlined'
					onChange={handleInputs}
					defaultValue={productRef.current.price || ''}
					placeholder={$`Precio real`}
					label={$`Precio del producto`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<MoneyTwoTone color='primary' />
							</InputAdornment>
						),
					}}
				/>
				<TextField
					type='number'
					id='promoPrice'
					name='promoPrice'
					variant='outlined'
					onChange={handleInputs}
					defaultValue={productRef.current.promoPrice || ''}
					label={$`Precio promocional`}
					placeholder={$`Precio de oferta`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<LocalOfferTwoTone color='primary' />
							</InputAdornment>
						),
					}}
				/>
			</div>
			<hr />
			<div className={Styles.row}>
				<TextField
					id='count'
					name='count'
					type='number'
					variant='outlined'
					onChange={handleInputs}
					defaultValue={productRef.current.count || ''}
					label={$`Cantidad en Stock`}
					placeholder={$`Cantidad en inventario`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<LayersTwoTone color='primary' />
							</InputAdornment>
						),
					}}
				/>
				<TextField
					id='sku'
					name='sku'
					variant='outlined'
					onChange={handleInputs}
					defaultValue={productRef.current.sku || ''}
					placeholder={$`Correlativo`}
					label={$`SKU (código unico del producto)`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<FingerprintTwoTone color='primary' />
							</InputAdornment>
						),
					}}
				/>
			</div>
			<hr />
			<div className={Styles.row}>
				<TextField
					id='unitName'
					name='unitName'
					variant='outlined'
					onChange={handleInputs}
					label={$`Nombre de unidad`}
					defaultValue={productRef.current.unitName || ''}
					placeholder={$`Porcion, Caja, Bolsa`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<TollTwoTone color='primary' />
							</InputAdornment>
						),
					}}
				/>
				<FormControl variant='outlined'>
					<InputLabel htmlFor='unit' id='unit-label'>{$`Unidad`}</InputLabel>
					<Select
						id='unit'
						name='unit'
						color='primary'
						variant='outlined'
						label={$`Unidad`}
						labelId='unit-label'
						onChange={handleInputs}
						defaultValue={productRef.current.unit.toString() || '1'}
						inputProps={{
							name: 'unit',
							id: 'unit',
						}}>
						<MenuItem value={1}>
							{'1'} {$`unidad`}
						</MenuItem>
						<MenuItem value={1 / 2}>
							{'1/2'} {$`unidad`}
						</MenuItem>
						<MenuItem value={1 / 4}>
							{'1/4'} {$`unidad`}
						</MenuItem>
					</Select>
				</FormControl>
			</div>
			<hr />
			<div className={Styles.row}>
				<FormControl variant='outlined'>
					<InputLabel htmlFor='stockOption' id='stockOption-label'>{$`Opción de stock`}</InputLabel>
					<Select
						color='primary'
						id='stockOption'
						name='stockOption'
						variant='outlined'
						onChange={handleInputs}
						label={$`Opción de stock`}
						defaultValue={productRef.current.stockOption || 'lim'}
						labelId='stockOption-label'
						inputProps={{
							name: 'stockOption',
							id: 'stockOption',
						}}>
						<MenuItem value='lim'>{$`Stock limitado a disponibilidad`}</MenuItem>
						<MenuItem value='ctn'>{$`Continuar vendiendo sin stock`}</MenuItem>
						<MenuItem value='inf'>{$`Stock sin limites de venta`}</MenuItem>
					</Select>
				</FormControl>
				<Button onClick={showStockInfo} startIcon={<InfoTwoToneIcon />} variant='outlined'>
					{$`Abrir información`}
				</Button>
			</div>
		</div>
	)
}

export default Stock
