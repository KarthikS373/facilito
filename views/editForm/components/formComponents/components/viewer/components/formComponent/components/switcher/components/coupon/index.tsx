// REACT
import React, { useContext, useState } from 'react'

// ESTILOS
import StylesText from '../textInput/style.module.scss'
import Styles from './style.module.scss'

// ICONOS
import Close from '@mui/icons-material/Close'
import Add from '@mui/icons-material/Add'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Switch from '@mui/material/Switch'
import Input from '@mui/material/Input'

// COMPONENTES
import openCouponEditor from './components/editor'

// CONTEXTO
import getDefCoupons, { deleteCoupon, onChangeSwitch } from './tools'
import FormContext from '../../../../../../context'
import useStrings from 'hooks/lang'

const Coupon: React.FC = () => {
	// PROPS
	const props = useContext(FormContext)

	// LISTA DE CUPONES
	const [coupons, setCoupons] = useState<(Coupon | null)[]>(getDefCoupons(props.coupons))

	// SWITCH DE MOSTRAR
	const [showCouponSwitch, setShowCouponSwitch] = useState<boolean>(props.switch_1 ?? true)

	// STRINGS
	const { $ } = useStrings()

	// ABRIR CUPÓN
	const openCouponEv = (enableOpen: boolean, defCouponIndex?: number) => () =>
		openCouponEditor(enableOpen, coupons, setCoupons, props.onChange, defCouponIndex)

	// BORRAR CUPÓN
	const deleteCouponEv = (index: number) => () => deleteCoupon(index, setCoupons)

	// GUARDAR SWITCH
	const handleSwitch = (_ev: unknown, checked: boolean) =>
		onChangeSwitch(checked, setShowCouponSwitch, props.onChange)

	return (
		<>
			<Input
				placeholder={$`Describe el titulo de tus cupones`}
				required
				defaultValue={props.label}
				className={`${StylesText.label} ${props.preview && StylesText.labelPreview}`}
				id={`${props.name}_${props.id}`}
				inputProps={{ 'aria-label': 'Answer' }}
				onChange={props.onWrite && props.onWrite('label')}
			/>
			{props.required && props.preview && <span className={StylesText.requiredSpan}>＊</span>}
			<Input
				multiline
				required
				onChange={props.onWrite && props.onWrite('helper')}
				aria-label='Helper'
				className={`${StylesText.label} ${StylesText.longHelper}`}
				placeholder={$`Agrega un texto de ayuda`}
				defaultValue={props.helper}
				id={`${props.name}_helper_${props.id}`}
			/>
			<div
				className={Styles.sliderContainer}
				style={props.preview ? { marginBottom: '25px' } : undefined}>
				<div className={Styles.slider}>
					{coupons.map((coupon: Coupon | null, key: number) => {
						return (
							<div
								className={Styles.product}
								key={`coupon_${props.id}_${key}`}
								onClick={openCouponEv(coupon === null)}>
								{coupon && (
									<IconButton
										size='small'
										onClick={deleteCouponEv(key)}
										className={Styles.productClose}>
										<Close />
									</IconButton>
								)}
								{coupon ? (
									<div className={Styles.productContentOpt} onClick={openCouponEv(true, key)}>
										<p>{coupon.id}</p>
										<span>
											{coupon.type === 'discount' && `${coupon.percent}% ${$`de descuento`}`}
											{coupon.type === 'promo' &&
												`${coupon.factors ? coupon.factors[0] : 0}x${
													coupon.factors ? coupon.factors[1] : 0
												} ${$`en tu compra`}`}
										</span>
									</div>
								) : (
									<Add />
								)}
							</div>
						)
					})}
				</div>
			</div>
			<Tooltip title={$`Mostrar cupones`} placement='top' arrow>
				<FormControlLabel
					className={`${Styles.requestGeo} ${Styles.showCoupon} ${
						props.preview ? Styles.requestGeoPreview : ''
					}`}
					value='start'
					onChange={handleSwitch}
					style={props.active ? undefined : { display: 'none' }}
					control={<Switch checked={showCouponSwitch} color='primary' />}
					label={$`Mostrar cupones`}
					labelPlacement='start'
				/>
			</Tooltip>
		</>
	)
}

export default Coupon
