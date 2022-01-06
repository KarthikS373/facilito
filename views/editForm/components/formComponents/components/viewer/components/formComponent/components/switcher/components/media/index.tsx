// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import StylesGlb from '../../../../style.module.scss'
import Styles from './style.module.scss'

// NEXT
import Image from 'next/image'

// ICONOS
import SlideshowRounded from '@mui/icons-material/SlideshowRounded'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import Close from '@mui/icons-material/Close'

// MATERIAL
import IconButton from '@mui/material/IconButton'

// CONTEXTO
import FormContext from 'views/editForm/components/formComponents/components/viewer/context'
import BusinessContext from 'context/business'
import useStrings from 'hooks/lang'
import { compressImage, getURL, uploadFile } from 'utils/storage'

// PROPIEDADES
interface FormMediaProps {
	isVideo?: boolean
}

const FormMedia: React.FC<FormMediaProps> = (eProps: FormMediaProps) => {
	//  STRINGS, USER Y COMPANY
	const company = useContext(BusinessContext)
	const { $ } = useStrings()

	// PROPS
	const props = useContext(FormContext)

	// ESTADO
	const [currentImage, setCurrentImage] = useState<string | null>(props.src || null)

	// LEER ARCHIVO
	const readFile = (ev: React.ChangeEvent) => {
		// ARCHIVOS
		const inp = ev.target as HTMLInputElement
		const files = inp.files

		// LEER
		if (files && files[0]) {
			// ALERTA
			window.Alert({
				title: 'Espera...',
				body: 'Se esta subiendo tu archivo, esto dependerá de tu velocidad, no te salgas de la aplicación por favor.',
				type: 'window',
				fixed: true,
			})

			// SUBIR A CLOUD
			if (company.business?.id) {
				const path = `/${company.business?.id}/forms/${props.id}}`
				compressImage(files[0]).then((image: File) => {
					uploadFile(image, path).then(() => {
						getURL(path).then((src: string) => {
							if (src) {
								window.hideAlert()
								props.onChange && props.onChange('src', src)
								setCurrentImage(src)
							}
						})
					})
				})
			}
		}
		inp.value = ''
	}

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
						<Image unoptimized height={100} width={100} src={currentImage} alt='Uploaded' />
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
				onChange={readFile}
				style={{ display: 'none' }}
				id={`${props.name}_${props.id}`}
				type='file'
				multiple={false}
				accept={eProps.isVideo ? 'video/mp4,video/x-m4v,video/*' : 'image/*'}
			/>
			<input
				aria-label='Helper'
				className={`${StylesGlb.label} ${StylesGlb.helper}`}
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
				className={`${StylesGlb.label} ${StylesGlb.helper}`}
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
