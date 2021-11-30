// REACT
import React from 'react'

// HOC
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

interface FooterProps {
	hideFooter: boolean
	minimize: boolean
	radius?: string
}
const Footer: React.FC<FooterProps> = ({ hideFooter, minimize, radius }) => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<footer
			className={Styles.footer}
			style={
				!minimize
					? {
							maxWidth: hideFooter ? '650px' : '100%',
							borderRadius: radius ?? (hideFooter ? 'var(--radius) var(--radius) 0 0 ' : '0px'),
							background: hideFooter ? 'rgba(0,0,0,.4)' : 'var(--secondaryDark)',
							backdropFilter: hideFooter ? 'blur(10px)' : 'none',
					  }
					: { display: 'none' }
			}>
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
