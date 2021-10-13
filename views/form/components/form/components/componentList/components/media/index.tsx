// REACT
import React, { useContext } from 'react'

// NEXT
import Image from 'next/image'

// CONTEXTO
import FormContext from '../../context'

// ESTILOS
import Styles from './style.module.scss'

interface FormMediaProps {
	isVideo?: boolean
}
const FormMedia: React.FC<FormMediaProps> = ({ isVideo }: FormMediaProps) => {
	// FORM PROPS
	const props = useContext(FormContext)

	return (
		<a
			className={Styles.image}
			rel='noopener noreferrer'
			title={props.href || '#'}
			href={props.href || '#playMedia'}
			target={props.href ? '_blank' : '_self'}>
			{isVideo ? (
				<video src={props.src} controls />
			) : (
				<Image unoptimized src={props.src || ''} alt={props.alt} height={200} width={200} />
			)}
			<i>{props.alt}</i>
		</a>
	)
}

export default FormMedia
