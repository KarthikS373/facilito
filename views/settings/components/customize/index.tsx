import React, { useContext } from 'react'

// MATERIAL
import Paper from '@mui/material/Paper'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import CustomBackground from 'components/customBackground'

// HOOKS
import useStrings from 'hooks/lang'

// CONTEXTO
import SettingsContext from 'views/settings/context'
import setImageRef from './tools'

const Customize: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// CONTEXTO
	const { businessRef, backgroundRef, bannerRef, setCustomBackground } = useContext(SettingsContext)

	// TEMPORAL BACKGROUND
	const onImage = (type: 'back' | 'bann') => (image: File | string) =>
		setImageRef(type, backgroundRef, bannerRef, setCustomBackground, image)

	return (
		<Paper className={Styles.container}>
			<div className={Styles.info}>
				<h3>{$`Personalizar`}</h3>
				<p>{$`Crea un tema seleccionando colores, sube una imagen de portada y cambia tu foto de perfil.`}</p>
			</div>
			<div className={Styles.custom}>
				<CustomBackground
					showTitle={false}
					onBanner={onImage('bann')}
					onBackground={onImage('back')}
					bannerTitle={$`Cambiar foto`}
					defaultBanner={businessRef.current?.picture ?? ''}
					bannerText={$`Sube un logo o foto de tu negocio.`}
					bannerDescription={$`La imagen puede ser de 500px x 500px`}
					defaultBackground={
						businessRef.current?.backgroundImage?.length
							? businessRef.current?.backgroundImage
							: businessRef.current?.background ?? ''
					}
				/>
			</div>
		</Paper>
	)
}

export default Customize
