// REACT
import React from 'react'

// HOC
import withStrings from 'hoc/lang'

// ESTILOS
import Styles from './style.module.scss'

const Footer: React.FC = withStrings(({ $ }) => {
	return (
		<footer className={Styles.footer}>
			<strong>{$`Facilito©`}</strong>
			<div>
				<a
					target='_blank'
					rel='noopener noreferer'
					href='https://appfacilito.com/privacy.pdf'
					title={$`Terminos y condiciones`}>{$`Terminos y condiciones`}</a>
				<a
					target='_blank'
					rel='noopener noreferer'
					href='https://appfacilito.com/privacy.pdf'
					title={$`Politicas de privacidad`}>{$`Politicas de privacidad`}</a>
			</div>
		</footer>
	)
})

export default Footer
