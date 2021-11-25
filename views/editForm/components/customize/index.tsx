// REACT
import React, { useRef, useContext } from 'react'

// COMPONENTES
import CustomBackground from 'components/customBackground'
import SideBar from 'components/sideBar'

// UTILS
import { CustomizeMenuProps, handleClose } from './tools'

// CONTEXTO
import BusinessContext from 'context/business'

const CustomizeMenu: React.FC<CustomizeMenuProps> = (props: CustomizeMenuProps) => {
	// BUSINESS
	const company = useContext(BusinessContext)

	// REFERENCIAS
	const backgroundRef: React.MutableRefObject<File | string> = useRef('')
	const bannerRef: React.MutableRefObject<File | string> = useRef('')

	// TEMPORAL BACKGROUND
	const onBackground = (image: File | string) => (backgroundRef.current = image)

	// TEMPORAL BANNER
	const onBanner = (image: File | string) => (bannerRef.current = image)

	// GUARDAR COLORES
	const onClose = () =>
		handleClose(
			backgroundRef,
			bannerRef,
			props.onColor,
			props.onBanner,
			props.onBack,
			company.business?.id,
			props.id
		)

	return (
		<SideBar open={props.open} onClose={onClose}>
			<CustomBackground
				defaultBackground={props.defaultBackground}
				defaultBanner={props.defaultBanner}
				onBackground={onBackground}
				onBanner={onBanner}
				responsive
				showTitle
			/>
		</SideBar>
	)
}

export default CustomizeMenu
