// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'

// ICONOS
import FormatListNumbered from '@mui/icons-material/FormatListNumbered'
import FormatListBulleted from '@mui/icons-material/FormatListBulleted'
import LocalOffer from '@mui/icons-material/LocalOfferTwoTone'
import SearchIcon from '@mui/icons-material/SearchTwoTone'

// HOOKS
import { useCompanyProducts } from 'hooks/business'
import { useTheme } from '@mui/material/styles'
import BusinessContext from 'context/business'
import { saveCoupons } from '../../tools'
import useStrings from 'hooks/lang'
import saveProduct, {
	deleteProducts,
	getDefValues,
	handleCouponFields,
	handleCouponType,
	handleMultipleCoupon,
} from './tools'

// PROPIEDADES
interface CouponEditorProps {
	defCoupon: Coupon | null
	onChange: (coupon: Coupon) => unknown
}

// TIPOS
const couponTypes: Coupon['type'][] = ['discount', 'promo']

const CouponEditor: React.FC<CouponEditorProps> = ({ onChange, defCoupon }) => {
	// PRODUCTOS DE EMPRESA
	const [companyProducts, setCompanyProducts] = useState<Product[] | null>([])

	// CUPÓN
	const [coupon, setCoupon] = useState<Coupon>(getDefValues(defCoupon))

	// COMPANY
	const company = useContext(BusinessContext)

	// STRINGS
	const { $ } = useStrings()

	// AGREGAR A CUPÓN
	const handleCoupon = (ev: React.ChangeEvent<HTMLInputElement>) =>
		handleCouponFields(ev, setCoupon, onChange)

	// CAMBIAR ESTADO DE HABILITADO
	const handleEnable = (_ev: React.ChangeEvent, checked: boolean) =>
		setCoupon((prevCoupon: Coupon) => ({ ...prevCoupon, enable: checked }))

	// CAMBIAR VALORES DE MULTIPLES
	const multipleCouponEv = (index: number) => (ev: React.ChangeEvent<HTMLInputElement>) =>
		handleMultipleCoupon(index, ev, setCoupon, onChange)

	// GUARDAR PRODUCTO
	const saveCurrentProduct = (_ev: unknown, product: string | Product | null) =>
		saveProduct(product, setCoupon, onChange)

	// BORRAR PRODUCTOS
	const deleteProductsEv = (index: number) => () => deleteProducts(index, setCoupon, onChange)

	// OBTENER TODOS LOS PRODUCTOS
	useCompanyProducts(setCompanyProducts, true, company.business?.id ?? '', true)

	// CAMBIAR TIPO DE CUPÓN
	const handleType = (ev: SelectChangeEvent) => handleCouponType(ev, setCoupon, onChange)

	// LABELS
	const typeLabels = [$`Descuento`, $`Promoción`]

	// TEMA
	const theme = useTheme()

	return (
		<form className={Styles.container}>
			<div
				className={Styles.preview}
				style={{
					opacity: coupon.enable ? '1' : '0.6',
				}}>
				<div>
					<input
						id='coupon-id'
						name='id'
						type='text'
						maxLength={10}
						style={{
							pointerEvents: coupon.enable ? 'all' : 'none',
						}}
						placeholder={$`Código aquí`}
						value={coupon.id}
						onChange={handleCoupon}
					/>
					<p>
						{coupon.type === 'discount'
							? coupon?.percent
							: coupon.type === 'promo'
							? `${coupon.factors ? coupon.factors[0] || 1 : 1}x${
									coupon.factors ? coupon.factors[1] || 1 : 1
							  } `
							: coupon?.percent}
						{coupon.type === 'discount' && '% '}
						{$`en tu compra`}
					</p>
					<span style={{ background: theme.palette.primary.main }}>{company.business?.name} ©</span>
				</div>
				<div className={Styles.chips}>
					{coupon.products &&
						coupon.products.map((product: Partial<Product>, prIndex: number) => (
							<Chip
								key={`product_chip_${prIndex}`}
								label={product.title?.split(' ')[0]}
								onDelete={deleteProductsEv(prIndex)}
							/>
						))}
				</div>
				<div className={Styles.settings}>
					<Switch
						className={Styles.enableSwitch}
						checked={coupon.enable}
						onChange={handleEnable}
						color='primary'
					/>
				</div>
			</div>
			<div className={Styles.data}>
				<div className={Styles.count}>
					<FormControl>
						<InputLabel shrink id='coupon-type-select-placeholder-label-label'>
							{$`Tipo de cupón`}
						</InputLabel>
						<Select
							fullWidth
							label={$`Tipo de cupón`}
							labelId='coupon-type-select-placeholder-label-label'
							id='coupon-type-select-placeholder-label'
							value={coupon.type}
							onChange={handleType}>
							{typeLabels.map((option: string, key: number) => (
								<MenuItem key={`coupon_type_${key}`} value={couponTypes[key]}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						id='coupon-count'
						name='count'
						type='tel'
						variant='outlined'
						value={coupon.count}
						className={Styles.couponCount}
						onChange={handleCoupon}
						placeholder='0'
						label={$`Cantidad`}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<FormatListNumbered color='primary' />
								</InputAdornment>
							),
						}}
					/>
				</div>

				{(companyProducts?.length ?? 0) > 0 && (
					<div className={Styles.productOptions}>
						<Autocomplete
							freeSolo
							id='product-search'
							options={companyProducts || []}
							getOptionLabel={(option) => (option ? option.title : '')}
							onChange={saveCurrentProduct}
							noOptionsText='Sin productos'
							renderInput={(params) => (
								<TextField
									{...params}
									fullWidth
									margin='normal'
									variant='outlined'
									label={$`Buscar productos`}
									placeholder={$`Ej: ` + companyProducts?.[0].title}
									InputProps={{
										...params.InputProps,
										type: 'text',
										startAdornment: (
											<InputAdornment position='start'>
												<SearchIcon color='primary' />
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</div>
				)}
				{coupon.type === 'promo' && (
					<div className={Styles.multipleOptions}>
						<TextField
							id='coupon-items'
							name='items'
							fullWidth
							type='tel'
							inputProps={{ maxLength: 3 }}
							variant='outlined'
							placeholder='2'
							onChange={multipleCouponEv(0)}
							value={coupon.factors ? coupon.factors[0] || 0 : 0}
							label={$`Valor mayor`}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<FormatListBulleted color='primary' />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							id='coupon-factor'
							name='factor'
							fullWidth
							type='tel'
							inputProps={{ maxLength: 3 }}
							variant='outlined'
							onChange={multipleCouponEv(1)}
							value={coupon.factors ? coupon.factors[1] || 0 : 0}
							placeholder='1'
							label={$`Valor menor`}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LocalOffer color='primary' />
									</InputAdornment>
								),
							}}
						/>
					</div>
				)}
				{coupon.type === 'discount' && (
					<div className={Styles.discountOptions}>
						<TextField
							id='coupon-per'
							name='percent'
							fullWidth
							type='tel'
							onChange={handleCoupon}
							inputProps={{ maxLength: 3 }}
							variant='outlined'
							value={coupon.percent || ''}
							placeholder='50'
							label={$`Descuento`}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LocalOffer color='primary' />
									</InputAdornment>
								),
							}}
						/>
					</div>
				)}
			</div>
		</form>
	)
}

const openCouponEditor = (
	enableOpen: boolean,
	coupons: (Coupon | null)[],
	setCoupons: React.Dispatch<React.SetStateAction<(Coupon | null)[]>>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown,
	defCouponIndex?: number
): void => {
	if (enableOpen) {
		// DEF COUPON
		const defCoupon = defCouponIndex !== undefined ? coupons[defCouponIndex] : null

		// CUPÓN Y GUARDAR CUPÓN
		let coupon: Coupon | undefined
		const saveNewCoupon = (newCoupon: Coupon) => (coupon = newCoupon)

		// ALERTA
		window.Alert({
			title: 'Agregar cupón',
			body: 'Aquí puedes editar tu cupón y también compartir como imagen',
			type: 'confirm',
			maxWidth: 600,
			onHide: () => window.hideAlert(),
			onConfirm: () =>
				setCoupons((prevCoupons: (Coupon | null)[]) => {
					// COPIAR
					const tmpCoupons = [...prevCoupons]

					// AGREGAR O ACTUALIZAR
					if (coupon) {
						if (coupon.id === '') coupon.id = 'MYCOUPON'
						if (coupon.type === 'discount' && coupon.percent === undefined) coupon.percent = 0
						if (defCouponIndex === undefined) tmpCoupons.unshift(coupon)
						else tmpCoupons[defCouponIndex] = coupon
					}

					// ACTUALIZAR
					saveCoupons(tmpCoupons, onChange)
					return tmpCoupons
				}),
			customElements: <CouponEditor defCoupon={defCoupon} onChange={saveNewCoupon} />,
		})
	}
}

export default openCouponEditor
