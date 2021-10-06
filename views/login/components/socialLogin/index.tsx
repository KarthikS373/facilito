// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import ColorButton from 'components/button'
import Button from '@mui/material/Button'

// NEXT
import Image from 'next/image'

// HOC
import useStrings from 'hooks/lang'

// ICONOS
import Facebook from '@mui/icons-material/Facebook'

// AUTH
import { facebookSigning, googleSigning } from 'utils/auth'

// PROPS
interface SocialLoginProps {
	remember: boolean
}
const SocialLogin: React.FC<SocialLoginProps> = ({ remember }) => {
	// STRINGS
	const { $ } = useStrings()

	// LOGINS
	const fbSigning = () => facebookSigning(remember)
	const gSigning = () => googleSigning(remember)

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
			<ColorButton
				fullWidth
				variant='contained'
				onClick={gSigning}
				classes={{ root: Styles.googleBtn }}
				$style={{
					color: '#555',
					background: '#e0e0e0',
				}}>
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
			</ColorButton>
		</div>
	)
}

export default SocialLogin
