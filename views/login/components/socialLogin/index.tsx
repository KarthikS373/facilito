// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import Button from '@material-ui/core/Button'

// NEXT
import Image from 'next/image'

// HOC
import useStrings from 'hooks/lang'

// ICONOS
import Facebook from '@material-ui/icons/Facebook'

// AUTH
import { facebookSigning, googleSigning } from 'utils/auth'

const SocialLogin: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// LOGINS
	const fbSigning = () => facebookSigning()
	const gSigning = () => googleSigning()

	return (
		<div className={Styles.container}>
			<Button
				fullWidth
				variant='contained'
				classes={{ root: Styles.fbBtn }}
				onClick={fbSigning}
				startIcon={<Facebook />}>
				{$`Iniciar con Facebook`}
			</Button>
			<Button fullWidth variant='contained' onClick={gSigning} classes={{ root: Styles.googleBtn }}>
				<div className={Styles.googleIcon}>
					<Image
						unoptimized
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

export default SocialLogin
