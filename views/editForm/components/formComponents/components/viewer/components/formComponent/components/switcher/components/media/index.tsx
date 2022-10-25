// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import StylesText from '../textInput/style.module.scss'
import Styles from './style.module.scss'

// NEXT
import Image from 'next/image'

// ICONOS
import SlideshowRounded from '@mui/icons-material/SlideshowRounded'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import Close from '@mui/icons-material/Close'

// MATERIAL
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'

// CONTEXTO
import FormContext from '../../../../../../context'
import BusinessContext from 'context/business'
import useStrings from 'hooks/lang'
import readFile from './tools'

// PROPIEDADES
interface FormMediaProps {
	isVideo?: boolean
}

const FormMedia: React.FC<FormMediaProps> = (eProps: FormMediaProps) => {
	// COMPANY
	const company = useContext(BusinessContext)

	// STRINGS
	const { $ } = useStrings()

	// PROPS
	const props = useContext(FormContext)

	// ESTADO
	const [currentImage, setCurrentImage] = useState<string | null>(props.src || null)

	// LEER ARCHIVO
	const readFileEv = (ev: React.ChangeEvent) =>
		readFile(ev, props.id, company.business, setCurrentImage, props.onChange)

	// ELIMINAR
	const removeImage = () => setCurrentImage(null)

	return (
		<>
			{currentImage !== null && !props.preview && (
				<IconButton size='small' className={Styles.removeImage} onClick={removeImage}>
					<Close />
				</IconButton>
			)}
			<label
				className={Styles.mediaLabel}
				htmlFor={`${props.name}_${props.id}`}
				style={{ border: currentImage !== null ? 'none' : '4px dashed #999' }}>
				{currentImage !== null ? (
					!eProps.isVideo ? (
						<Image layout='fill' height={100} width={100} src={currentImage} alt='Uploaded' />
					) : (
						<video src={currentImage} controls />
					)
				) : (
					<>
						{eProps.isVideo ? <SlideshowRounded /> : <ImageOutlined />}
						<p>{$`Selecciona un archivo, máximo 10mb por archivo.`}</p>
					</>
				)}
			</label>
			<input
				onChange={readFileEv}
				style={{ display: 'none' }}
				id={`${props.name}_${props.id}`}
				type='file'
				multiple={false}
				accept={eProps.isVideo ? 'video/mp4,video/x-m4v,video/*' : 'image/*'}
			/>
			<Input
				aria-label='Helper'
				multiline
				className={`${StylesText.label} ${StylesText.longHelper}`}
				defaultValue={props.alt}
				placeholder={
					eProps.isVideo
						? $`Agrega una descripción al video`
						: $`Agrega una descripción a la imagen`
				}
				onChange={props.onWrite && props.onWrite('alt')}
				id={`${props.name}_helper_${props.id}`}
			/>
			<input
				aria-label='Href'
				className={`${StylesText.label} ${StylesText.helper}`}
				defaultValue={props.href}
				style={{ color: 'var(--blue)' }}
				placeholder={
					eProps.isVideo ? $`Agrega un enlace al video` : $`Agrega un enlace a la imagen`
				}
				onChange={props.onWrite && props.onWrite('href')}
				id={`${props.name}_href_${props.id}`}
			/>
		</>
	)
}

export default FormMedia
