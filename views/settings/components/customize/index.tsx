import React from 'react'

// MATERIAL
import Paper from '@mui/material/Paper'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import CustomBackground from 'components/customBackground'

// HOOKS
import { GeneralProps } from '../tabs/tools'
import useStrings from 'hooks/lang'

const Customize: React.FC<GeneralProps> = ({ businessRef, backgroundRef, bannerRef }) => {
	// STRINGS
	const { $ } = useStrings()

	// TEMPORAL BACKGROUND
	const onBackground = (image: File | string) => (backgroundRef.current = image)

	// TEMPORAL BANNER
	const onBanner = (image: File | string) => (bannerRef.current = image)

	return (
		<Paper>
			<div className={Styles.info}>
				<h3>{$`Personalizar`}</h3>
				<p>{$`Crea un tema seleccionando colores, sube una imagen de portada y cambia tu foto de perfil.`}</p>
			</div>
			<div className={Styles.custom}>
				<CustomBackground
					showTitle={false}
					onBanner={onBanner}
					onBackground={onBackground}
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
