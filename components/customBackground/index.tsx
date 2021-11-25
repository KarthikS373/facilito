// REACT
import React, { useState, useContext } from 'react'

// IMAGE
import Image from 'next/image'

// ICONOS
import SlideshowTwoTone from '@mui/icons-material/SlideshowTwoTone'
import PaletteTwoTone from '@mui/icons-material/PaletteTwoTone'
import ImageOutlined from '@mui/icons-material/ImageTwoTone'

// COMPONENTES
import showGallery from './components/gallery'
import ColorButton from 'components/button'
import Slider from '@mui/material/Slider'

// UTILS
import saveFile, { changeColorDegrees, changeColors, getDefValues, ImagesState } from './tools'
import { defThemeColors } from 'utils/tools'
import usePaletteColors from 'hooks/theme'
import useStrings from 'hooks/lang'
import useStateProps from './hooks'

// ESTILOS
import Styles from './style.module.scss'
import BusinessContext from 'context/business'

interface CustomBackgroundProps {
	showTitle?: boolean
	bannerTitle?: string
	bannerText?: string
	responsive?: boolean
	defaultBanner: string
	defaultBackground: string
	bannerDescription?: string
	onBanner: (image: File) => void
	onBackground: (image: File | string) => void
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({
	onBackground,
	onBanner,
	showTitle,
	bannerTitle,
	responsive,
	bannerText,
	bannerDescription,
	defaultBanner,
	defaultBackground,
}) => {
	// STRINGS
	const { $ } = useStrings()

	// IMAGENES
	const [images, setImages] = useState<ImagesState>(getDefValues(defaultBackground, defaultBanner))

	// COLORES
	const [colors, setDefColors] = useState<string[]>(defThemeColors)

	// BUSINESS
	const company = useContext(BusinessContext)

	// CAMBIAR COLORES
	const handleColors = (index: number) => (ev: React.ChangeEvent<HTMLInputElement>) =>
		changeColors(index, ev, setDefColors, onBackground)

	// CAMBIAR INCLINACIÓN
	const handleColorDegrees = (_event: unknown, newValue: number | number[]) =>
		changeColorDegrees(newValue, setDefColors, onBackground)

	// LEER ARCHIVO
	const readFile = (prefix: 'background' | 'banner') => (ev: React.ChangeEvent) =>
		saveFile(ev, prefix, onBackground, onBanner, setImages)

	// ABRIR GALERIA
	const openGallery = () =>
		showGallery({ business: company.business, onSelect: onBackground, setImages })

	// HOOKS
	useStateProps(defaultBackground, defaultBanner, setImages)

	// COLORES
	usePaletteColors(setDefColors, defaultBackground)

	return (
		<div className={Styles.container}>
			{showTitle && (
				<h2>
					<PaletteTwoTone /> {$`Personalizar`}
				</h2>
			)}

			{/* MENU */}
			<h3>{$`Cambiar fondo`}</h3>
			<div className={Styles.colors}>
				<p>{$`Selecciona dos colores`}</p>
				<div>
					{/* COLORES */}
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

					{/* SLIDER DE GRADOS */}
					<div className={Styles.degrees}>
						<span>{$`Grado de inclinación`}</span>
						<Slider
							min={0}
							max={360}
							color='primary'
							value={+colors[2]}
							valueLabelDisplay='auto'
							onChange={handleColorDegrees}
							aria-labelledby='degrees-slider'
						/>
					</div>
				</div>
			</div>
			{/* IMAGEN DE FONDO */}
			<div className={Styles.image}>
				<p>{$`Sube una imagen como fondo`}</p>
				<div
					style={{
						flexDirection: responsive ? 'column' : 'row',
						alignItems: responsive ? 'flex-start' : 'center',
					}}>
					<div>
						<label htmlFor='formBackground'>
							{images.background.length &&
							!images.background.startsWith('transparent linear-gradient') ? (
								<Image
									unoptimized
									src={images.background}
									width={50}
									height={50}
									alt='background'
								/>
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
					<ColorButton
						color='primary'
						variant='outlined'
						onClick={openGallery}
						fullWidth={responsive}
						startIcon={<SlideshowTwoTone />}
						$style={{
							color: 'var(--primary)',
							borderColor: 'var(--primary)',
							marginTop: responsive ? '15px' : '0',
						}}>
						{$`Abrir galeria`}
					</ColorButton>
				</div>
			</div>

			{/* IMAGEN DE BANNER */}
			<div className={Styles.image}>
				<h3>{bannerTitle?.length ? bannerTitle : $`Cambiar portada`}</h3>
				<p>{bannerText?.length ? bannerText : $`Sube una imagen de portada`}</p>
				<div>
					<div>
						<label htmlFor='bannerInp'>
							{images.banner?.length ? (
								<Image unoptimized src={images.banner} width={50} height={50} alt='banner' />
							) : (
								<ImageOutlined />
							)}
						</label>
						<input
							type='file'
							id='bannerInp'
							accept='image/*'
							multiple={false}
							style={{ display: 'none' }}
							onChange={readFile('banner')}
						/>
						<span>
							{bannerDescription?.length ? bannerDescription : $`Sube una imagen de 650px x 250px`}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

CustomBackground.defaultProps = {
	showTitle: true,
	bannerDescription: '',
	bannerText: '',
	bannerTitle: '',
	responsive: false,
}

export default CustomBackground
