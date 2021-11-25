import React from 'react'

// NEXT
import Image from 'next/image'

// TOOLS
import { ImagesState } from 'components/customBackground/tools'
import getBusinessGallery, { selectImage } from './tools'

// ESTILOS
import Styles from './style.module.scss'
import { useTheme } from '@mui/material/styles'

interface GalleryProps {
	business: Business | null
	onSelect: (backStr: string) => void
	setImages: React.Dispatch<React.SetStateAction<ImagesState>>
}

const Gallery: React.FC<GalleryProps> = (props) => {
	// IMAGENES
	const images = getBusinessGallery(props.business)

	// TEMA
	const theme = useTheme()

	// SELECCIONAR
	const onSelect = (index: number) => () => selectImage(index, props.business, props.onSelect)

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
			props.onSelect(tmpBack)
			props.setImages((prevImages) => ({ ...prevImages, background: tmpBack }))
		},
		customElements: <Gallery {...props} onSelect={onSelect} />,
	})
}

export default showGallery
