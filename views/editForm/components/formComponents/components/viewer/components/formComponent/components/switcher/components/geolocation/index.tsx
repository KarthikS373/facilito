// REACT
import React, { useContext, useState } from 'react'

// ESTILOS
import StylesGlb from '../../../../style.module.scss'
import Styles from './style.module.scss'

// COMPONENTES
import Map from './components/map'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import Tooltip from '@mui/material/Tooltip'
import Switch from '@mui/material/Switch'
import Input from '@mui/material/Input'

// TOOLS
import { handleSwitch, handleWrite } from './tools'
import FormContext from '../../../../../../context'
import useStrings from 'hooks/lang'

// ESTADO
interface CustomPlaceString {
	country: string
	city: string
	address: string
}

const Geolocation: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// FORM PROPS
	const props = useContext(FormContext)

	// LUGAR
	const [customPlace, setCustomPlace] = useState<CustomPlaceString>({
		country: props.label,
		city: props.helper,
		address: props.text,
	})

	// SWITCHS
	const [geoSwitch, setGeoSwitch] = useState<[boolean, boolean]>([
		props.switch_1 ?? false,
		props.switch_2 ?? false,
	])

	// ENVIAR DATOS
	const handleWriteEv = (prop: keyof BlockComponent) => (ev: React.ChangeEvent<HTMLInputElement>) =>
		handleWrite(prop, ev, setCustomPlace)

	// GUARDAR SWITCH
	const handleSwitchEv =
		(prop: keyof BlockComponent, index: number) => (_ev: unknown, checked: boolean) =>
			handleSwitch(prop, index, checked, setGeoSwitch, props.onChange)

	return (
		<>
			<div className={`${Styles.threeInputs} ${props.preview && Styles.threeInputsPreview}`}>
				<Input
					placeholder={$`País`}
					required
					defaultValue={props.label}
					className={`${StylesGlb.label} ${props.preview && StylesGlb.labelPreview}`}
					id={`${props.name}_${props.id}`}
					name='country'
					inputProps={{ 'aria-label': 'Country' }}
					onChange={handleWriteEv('label')}
				/>
				<Input
					placeholder={$`Ciudad`}
					required
					name='city'
					defaultValue={props.helper}
					className={`${StylesGlb.label} ${props.preview && StylesGlb.labelPreview}`}
					id={`${props.name}_helper_${props.id}`}
					inputProps={{ 'aria-label': 'City' }}
					onChange={handleWriteEv('helper')}
				/>
				<Input
					placeholder={$`Dirección`}
					required
					name='address'
					defaultValue={props.text}
					className={`${StylesGlb.label} ${props.preview && StylesGlb.labelPreview}`}
					id={`${props.name}_text_${props.id}`}
					inputProps={{ 'aria-label': 'Address' }}
					onChange={handleWriteEv('text')}
				/>
			</div>
			<Map
				className={props.preview ? Styles.mapPreview : undefined}
				place={`${customPlace.address},${customPlace.city} ${customPlace.country}`}
			/>
			<div className={Styles.requestGeoContainer}>
				<Tooltip title={$`Enviar ubicación del cliente`} placement='top' arrow>
					<FormControlLabel
						className={`${Styles.requestGeo} ${props.preview ? Styles.requestGeoPreview : ''}`}
						value='start'
						onChange={handleSwitchEv('switch_1', 0)}
						control={<Switch checked={geoSwitch[0]} color='primary' />}
						label={$`Enviar ubicación del cliente`}
						labelPlacement='start'
					/>
				</Tooltip>
				<Tooltip title={$`Ocultar mapa`} placement='top' arrow>
					<FormControlLabel
						className={`${Styles.requestGeo} ${props.preview ? Styles.requestGeoPreview : ''}`}
						value='start'
						onChange={handleSwitchEv('switch_2', 1)}
						control={<Switch checked={geoSwitch[1]} color='primary' />}
						label={$`Ocultar mapa`}
						labelPlacement='start'
					/>
				</Tooltip>
			</div>
		</>
	)
}

export default Geolocation
