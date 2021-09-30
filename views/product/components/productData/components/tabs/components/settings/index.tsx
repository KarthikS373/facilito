// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

// COMPONENTES
import TabInfo from '../tabInfo'

// ICONOS
import InfoTwoTone from '@mui/icons-material/InfoTwoTone'

// HOOKS
import useStrings from 'hooks/lang'

interface GeneralProps {
	show: boolean
	productRef: React.MutableRefObject<Product>
}
const Settings: React.FC<GeneralProps> = ({ show, productRef }) => {
	// STRINGS
	const { $ } = useStrings()

	// GUARDAR CAMBIOS
	const onChangeSwitch = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = ev.target
		productRef.current[name] = checked
	}

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TabInfo
				title={$`Configuracion y comportamiento`}
				body={$`Muestra este producto como destacado, activa su precio promocional y deshabilitar.`}
			/>

			<div className={Styles.row}>
				<FormControlLabel
					control={
						<Switch
							name='isPromo'
							color='primary'
							onChange={onChangeSwitch}
							defaultChecked={productRef.current.isPromo}
						/>
					}
					label={$`Activar precio promocional`}
				/>
				<div className={Styles.rowInfo}>
					<InfoTwoTone />
					<p>
						{$`El precio original se mostrará tachado con rojo y el precio promocional se mostrara primero.`}
					</p>
				</div>
			</div>

			<hr />

			<div className={Styles.row}>
				<FormControlLabel
					control={
						<Switch
							name='featured'
							color='primary'
							onChange={onChangeSwitch}
							defaultChecked={productRef.current.featured}
						/>
					}
					label={$`Mostrar como producto destacado`}
				/>
				<div className={Styles.rowInfo}>
					<InfoTwoTone />
					<p>
						{$`Los productos destacados se mostrarán automáticamente si añades un campo de destacado en tu formulario.`}
					</p>
				</div>
			</div>

			<hr />

			<div className={Styles.row}>
				<FormControlLabel
					control={
						<Switch
							name='active'
							color='primary'
							onChange={onChangeSwitch}
							defaultChecked={productRef.current.active}
						/>
					}
					label={$`Habilitar producto`}
				/>
				<div className={Styles.rowInfo}>
					<InfoTwoTone />
					<p>{$`Los productos marcados como inactivos no se mostraran en ningun formulario en donde se haya agregado.`}</p>
				</div>
			</div>
		</div>
	)
}

export default Settings
