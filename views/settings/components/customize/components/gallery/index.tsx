import React, { useContext } from 'react'

// NEXT
import Image from 'next/image'

// TOOLS
import getBusinessGallery, { selectImage } from './tools'

// ESTILOS
import Styles from './style.module.scss'
import { useTheme } from '@mui/material/styles'

// CONTEXT
import SettingsContext from 'views/settings/context'

interface GalleryProps {
	businessRef: React.MutableRefObject<Business | null>
	backgroundRef: React.MutableRefObject<File | string>
	bannerRef: React.MutableRefObject<File | string>
	onSelect: (backStr: string) => void
}

const Gallery: React.FC<GalleryProps> = (props) => {
	// IMAGENES
	const images = getBusinessGallery(props.businessRef)

	// CONTEXTO
	const { businessRef } = useContext(SettingsContext)

	// TEMA
	const theme = useTheme()

	// SELECCIONAR
	const onSelect = (index: number) => () => selectImage(index, businessRef, props.onSelect)

	return (
		<div className={Styles.container}>
			{images.map((image, index) => (
				<button
					key={image}
					onClick={onSelect(index)}
					style={{ '--primary': theme.palette.primary.main } as React.CSSProperties}>
					<Image src={image} height={70} width={70} alt={`gallery_${index}`} unoptimized />
				</button>
			))}
		</div>
	)
}

/**
 * Mostrar galeria de imagenes
 * @param props
 */
const showGallery = (props: GalleryProps): void => {
	// GUARDAR TEMPORAL
	let tmpBack = ''
	const onSelect = (backStr: string) => (tmpBack = backStr)

	window.Alert({
		title: 'Galeria de fondos',
		body: 'Selecciona una imagen de nuestra galeria o de tus fondos personalizados.',
		type: 'confirm',
		onConfirm: () => {
			if (props.businessRef.current) {
				props.businessRef.current.background = ''
				props.businessRef.current.backgroundImage = tmpBack
			}
		},
		customElements: <Gallery {...props} onSelect={onSelect} />,
	})
}

export default showGallery
