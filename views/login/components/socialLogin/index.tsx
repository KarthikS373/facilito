// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import Button from '@material-ui/core/Button'
import Image from 'next/image'

// HOOKS
import { withStrings, Portray } from 'components/portray'

// ICONOS
import Facebook from '@material-ui/icons/Facebook'

// AUTH
import { facebookSigning, googleSigning } from 'utils/auth'

const SocialLogin: Portray.FC = ({ $ }) => {
	// LOGINS
	const fbSigning = () => facebookSigning()
	const gSigning = () => googleSigning()

	return (
		<div className={Styles.container}>
			<Button onClick={fbSigning}>
				<Facebook />
				{$`Iniciar con Facebook`}
			</Button>
			<Button onClick={gSigning}>
				<div className={Styles.googleIcon}>
					<Image
						className={Styles.googleIcon}
						src='/assets/icons/google.svg'
						alt='Google Logo'
						height={18}
						width={18}
					/>
				</div>
				{$`Iniciar con Google`}
			</Button>
		</div>
	)
}

export default withStrings(SocialLogin)
