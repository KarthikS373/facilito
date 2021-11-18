// REACT
import React, { useState, useContext, useEffect } from 'react'

// IMAGE
import Image from 'next/image'

// ICONOS
import ImageOutlined from '@mui/icons-material/ImageTwoTone'
import Palette from '@mui/icons-material/PaletteTwoTone'

// COMPONENTES
import Slider from '@mui/material/Slider'
import SideBar from 'components/sideBar'

// UTILS
import saveFile, {
	changeColorDegrees,
	changeColors,
	CustomizeMenuProps,
	getDefValues,
	ImagesState,
	saveColors,
} from './tools'
import { splitBackgroundColors } from 'utils/tools'
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

// ESTILOS
import Styles from './style.module.scss'

const CustomizeMenu: React.FC<CustomizeMenuProps> = (props: CustomizeMenuProps) => {
	// STRINGS
	const { $ } = useStrings()

	// BUSINESS
	const company = useContext(BusinessContext)

	// IMAGENES
	const [images, setImages] = useState<ImagesState>(
		getDefValues(props.defaultBackground, props.defaultBanner)
	)
	const [colors, setDefColors] = useState<[string, string, string]>(
		splitBackgroundColors(props.defaultBackground ?? '')
	)

	// CAMBIAR COLORES
	const handleColors = (index: number) => (ev: React.ChangeEvent<HTMLInputElement>) =>
		changeColors(index, ev, setDefColors)

	// CAMBIAR INCLINACIÓN
	const handleColorDegrees = (_event: unknown, newValue: number | number[]) =>
		changeColorDegrees(newValue, setDefColors)

	// LEER ARCHIVO
	const readFile = (prefix: string) => (ev: React.ChangeEvent) =>
		saveFile(ev, prefix, company.business, props, setImages)

	// GUARDAR
	const onClose = () => saveColors(colors, props.onColor, props.onBack)

	useEffect(() => {
		setImages(getDefValues(props.defaultBackground, props.defaultBanner))
		setDefColors(splitBackgroundColors(props.defaultBackground ?? ''))
	}, [props.defaultBackground, props.defaultBanner])

	return (
		<SideBar open={props.open} onClose={onClose}>
			<div className={Styles.container}>
				<h2>
					<Palette /> {$`Personalizar`}
				</h2>
				<h3>{$`Cambiar fondo`}</h3>
				<div className={Styles.colors}>
					<p>{$`Selecciona dos colores`}</p>
					<div>
						<input
							type='color'
							onChange={handleColors(0)}
							className={Styles.colorInp}
							value={colors[0]}
						/>
						<input
							type='color'
							className={Styles.colorInp}
							onChange={handleColors(1)}
							value={colors[1]}
						/>
						<div>
							<span>{$`Grado de inclinación`}</span>
							<Slider
								marks
								min={0}
								max={360}
								valueLabelDisplay='auto'
								onChange={handleColorDegrees}
								aria-labelledby='degrees-slider'
								value={+colors[2]}
							/>
						</div>
					</div>
				</div>
				<div className={Styles.image}>
					<p>{$`Sube una imagen como fondo`}</p>
					<div>
						<label htmlFor='formBackground'>
							{!images.background.startsWith('transparent linear-gradient') ? (
								<Image unoptimized width={50} height={50} alt='formBack' src={images.background} />
							) : (
								<ImageOutlined />
							)}
						</label>
						<input
							type='file'
							accept='image/*'
							multiple={false}
							id='formBackground'
							style={{ display: 'none' }}
							onChange={readFile('background')}
						/>
						<span>{$`Esto remplazara el fondo degradado.`}</span>
					</div>
				</div>
				<div className={Styles.image}>
					<h3>{$`Cambiar portada`}</h3>
					<p>{$`Sube una imagen de portada`}</p>
					<div>
						<label htmlFor='formBanner'>
							{images.banner.length ? (
								<Image unoptimized src={images.banner} alt='formBanner' width={50} height={50} />
							) : (
								<ImageOutlined />
							)}
						</label>
						<input
							type='file'
							id='formBanner'
							accept='image/*'
							multiple={false}
							style={{ display: 'none' }}
							onChange={readFile('banner')}
						/>
						<span>{$`Sube una imagen de 650px x 250px`}</span>
					</div>
				</div>
			</div>
		</SideBar>
	)
}

export default CustomizeMenu
