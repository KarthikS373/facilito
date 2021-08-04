// REACT
import React from 'react'

// HOC
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

const Footer: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<footer className={Styles.footer}>
			<strong>{$`Facilito©`}</strong>
			<div>
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://appfacilito.com/terms.pdf'
					title={$`Terminos y condiciones`}>{$`Terminos y condiciones`}</a>
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://appfacilito.com/privacy.pdf'
					title={$`Politicas de privacidad`}>{$`Politicas de privacidad`}</a>
			</div>
		</footer>
	)
}

export default Footer
