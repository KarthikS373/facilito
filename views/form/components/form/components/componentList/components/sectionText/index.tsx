// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// HOOKS
import useStrings from 'hooks/lang'

// CONTEXTO
import FormContext from '../../context'

interface SectionTextWriteProps {
	isAnchor?: boolean
}

const SectionText: React.FC<SectionTextWriteProps> = ({ isAnchor }: SectionTextWriteProps) => {
	// STRINGS
	const { $ } = useStrings()

	// FORM PROPS
	const props = useContext(FormContext)

	if (!isAnchor)
		return (
			<>
				<h2 className={Styles.title}>{props.label || $`Sin titulo`}</h2>
				{props.helper && <pre style={{ fontFamily: 'Montserrat' }}>{props.helper}</pre>}
			</>
		)
	else
		return (
			<a
				target='_blank'
				title={props.label}
				className={Styles.link}
				href={props.href || '#'}
				rel='noopener noreferrer'>
				{props.label}
			</a>
		)
}

export default SectionText
