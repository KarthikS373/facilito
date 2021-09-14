// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import showInfo from './components/info'

// MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

// ICONS
import FingerprintTwoTone from '@material-ui/icons/FingerprintTwoTone'
import LocalOfferTwoTone from '@material-ui/icons/LocalOfferTwoTone'
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone'
import LayersTwoTone from '@material-ui/icons/LayersTwoTone'
import MoneyTwoTone from '@material-ui/icons/MoneyTwoTone'
import TollTwoTone from '@material-ui/icons/TollTwoTone'

// UTILS
import changeProductProps from '../../utils/tools'

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
	const handleInputs = (ev: React.ChangeEvent<HTMLInputElement>) =>
		changeProductProps(ev, productRef)

	// MOSTRAR INFORMACION
	const showStockInfo = () => showInfo($)

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<div className={Styles.info}>
				<div className={Styles.text}>
					<h3>{$`Caracteristicas en stock`}</h3>
					<p>{$`Esta informacion sera utilizada en el carrito, y en el resumen de compra en tus formularios.`}</p>
				</div>
			</div>

			<div className={Styles.row}>
				<TextField
					id='price'
					name='price'
					type='number'
					variant='outlined'
					onChange={handleInputs}
					defaultValue={productRef.current.price}
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
					defaultValue={productRef.current.promoPrice}
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
					defaultValue={productRef.current.count}
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
					defaultValue={productRef.current.sku}
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
					defaultValue={productRef.current.unitName}
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
						defaultValue={productRef.current.unit || '1'}
						inputProps={{
							name: 'unit',
							id: 'unit',
						}}>
						<MenuItem value={'1'}>
							{'1'} {$`unidad`}
						</MenuItem>
						<MenuItem value={'1/2'}>
							{'1/2'} {$`unidad`}
						</MenuItem>
						<MenuItem value={'1/4'}>
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
