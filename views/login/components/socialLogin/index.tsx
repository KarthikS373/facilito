// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import Button from '@material-ui/core/Button'

// NEXT
import Image from 'next/image'

// HOC
import withStrings from 'hoc/lang'

// ASSETS
import GoogleIcon from '../../../../public/assets/icons/google.svg'

// ICONOS
import Facebook from '@material-ui/icons/Facebook'

// AUTH
import { facebookSigning, googleSigning } from 'utils/auth'

const SocialLogin: React.FC = withStrings(({ $ }) => {
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
					<Image src={GoogleIcon} alt='Google Logo' className={Styles.googleIcon} />
				</div>
				{$`Iniciar con Google`}
			</Button>
		</div>
	)
})

export default SocialLogin
