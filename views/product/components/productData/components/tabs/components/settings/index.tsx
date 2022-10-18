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
import { GeneralProps } from '../../tools'
import onChangeSwitch from './tools'
import useStrings from 'hooks/lang'

const Settings: React.FC<GeneralProps> = ({ show, productRef }) => {
	// STRINGS
	const { $ } = useStrings()

	// GUARDAR CAMBIOS
	const handleSwitch = (ev: React.ChangeEvent<HTMLInputElement>) => onChangeSwitch(ev, productRef)

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TabInfo
				fullWidth
				title={$`Configuracion y comportamiento`}
				body={$`Muestra este producto como destacado, activa su precio promocional y deshabilitar.`}
			/>

			<div className={Styles.row}>
				<FormControlLabel
					control={
						<Switch
							name='isPromo'
							color='primary'
							onChange={handleSwitch}
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
							onChange={handleSwitch}
							defaultChecked={productRef.current.featured}
						/>
					}
					label={$`Mostrar como producto destacado`}
				/>
				<div className={Styles.rowInfo}>
					<InfoTwoTone />
					<p>{$`Los productos destacados se mostrarán si añades un campo de destacado.`}</p>
				</div>
			</div>

			<hr />

			<div className={Styles.row}>
				<FormControlLabel
					control={
						<Switch
							name='active'
							color='primary'
							onChange={handleSwitch}
							defaultChecked={productRef.current.active}
						/>
					}
					label={$`Habilitar producto`}
				/>
				<div className={Styles.rowInfo}>
					<InfoTwoTone />
					<p>{$`Los productos marcados como inactivos no se mostraran en ninguna tienda.`}</p>
				</div>
			</div>
		</div>
	)
}

export default Settings
