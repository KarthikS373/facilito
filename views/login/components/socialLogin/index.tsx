// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import Button from '@material-ui/core/Button'
import Image from 'next/image'

// STRINGS
import { useStrings } from 'hooks/context'

// ICONOS
import Facebook from '@material-ui/icons/Facebook'

// AUTH
import { facebookSigning, googleSigning } from 'utils/auth'

const SocialLogin = () => {
	// STRINGS
	const lang = useStrings()

	// LOGINS
	const fbSigning = () => facebookSigning()
	const gSigning = () => googleSigning()

	return (
		<div className={Styles.container}>
			<Button onClick={fbSigning}>
				<Facebook />
				{lang.login.facebook}
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
				{lang.login.google}
			</Button>
		</div>
	)
}

export default SocialLogin
