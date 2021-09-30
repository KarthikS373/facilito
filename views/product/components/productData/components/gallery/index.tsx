/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'

// COMPONENTES
import ColorButton from 'components/button'
import Image from 'next/image'

// ICONS
import Close from '@mui/icons-material/Close'
import Add from '@mui/icons-material/Add'

// HOOKS
import useStrings from 'hooks/lang'
import useImages from './utils/hooks'

// TOOLS
import updateImageList, { removeImage } from './utils/tools'

// PROPS
interface GalleryProps {
	productRef: React.MutableRefObject<Product>
	imagesRef: React.MutableRefObject<(File | null)[]>
}

const Gallery: React.FC<GalleryProps> = ({ productRef, imagesRef }) => {
	// STRINGS
	const { $ } = useStrings()

	// ESTADOS
	const [images, setImages] = useState<string[]>([])

	// ASIGNAR IMAGEN NUEVA
	const onChangeImage = (index: number) => updateImageList(index, setImages, productRef, imagesRef)

	// QUITAR IMAGEN
	const removeImageEv = (index: number) => removeImage(index, setImages, productRef)

	// CARGAR IMAGENES
	const trigger: string = productRef.current.picture?.join('') || ''
	useImages(productRef, setImages, trigger)

	return (
		<Paper>
			<div className={Styles.info}>
				<h3>{$`Fotos del producto`}</h3>
				<p>{$`Medidas recomendadas: 800 x 800`}</p>
				<p>{$`Tamaño máximo: 2MB`}</p>
			</div>
			<div className={Styles.container}>
				{images.map((image: string, picIndex: number) =>
					image.length ? (
						<div key={`image_${picIndex}`}>
							<IconButton onClick={removeImageEv(picIndex)} size='small'>
								<Close />
							</IconButton>
							<Image height='200' width='200' unoptimized src={image} alt={`gallery_${picIndex}`} />
						</div>
					) : (
						<label key={`image_${picIndex}`} htmlFor={`image_${picIndex}`}>
							<input
								type='file'
								accept='image/*'
								id={`image_${picIndex}`}
								onChange={onChangeImage(picIndex)}
								style={{ display: 'none' }}
							/>
							<ColorButton
								// @ts-ignore
								component='span'
								$style={{
									flexDirection: 'column',
									textAlign: 'center',
									fontSize: '1.2em',
									display: 'flex',
									lineHeight: 1.2,
									padding: 'calc(var(--margin) + 20px)',
									height: '100%',
									width: '100%',
								}}>
								<Add style={{ height: '50px', width: '50px' }} />
								{$`Agregar imagen`}
							</ColorButton>
						</label>
					)
				)}
			</div>
		</Paper>
	)
}

export default Gallery
