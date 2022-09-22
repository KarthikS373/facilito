// REACT
import React, { useState } from 'react'

// NEXT
import Image from 'next/image'

// SWIPE
import SwipeableViews from 'react-swipeable-views'

// MATERIAL
import IconButton from '@mui/material/IconButton'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'

// PROPIEDADES
interface SwipeViewerProps {
	images: string[]
	alts?: string[]
}

const SwipeViewer: React.FC<SwipeViewerProps> = (props: SwipeViewerProps) => {
	// CONTADOR
	const [index, setIndex] = useState<number>(0)

	// LISTA DE IMAGENEES
	const imageList = props.images?.filter((img) => img?.length) ?? []

	// MANEJAR INDEX
	const handleIndex = (add: number) => () =>
		setIndex(Math.min(Math.max(0, index + add), imageList.length - 1))

	// CAMBIAR INDEX
	const changeIndex = (index: number) => setIndex(index)

	return (
		<div className={Styles.container}>
			<SwipeableViews
				index={index}
				enableMouseEvents
				className={Styles.slider}
				onChangeIndex={changeIndex}>
				{imageList.map((pic: string, key: number) => (
					<div key={`picture_${key}`}>
						<Image src={pic} width={450} height={450} alt={props.alts ? props.alts[key] : ''} />
					</div>
				))}
			</SwipeableViews>
			{props.images.length > 1 && (
				<div className={Styles.swipeControls}>
					{index !== 0 && (
						<IconButton className={Styles.leftBtn} onClick={handleIndex(-1)}>
							<ChevronLeft />
						</IconButton>
					)}

					{index < imageList.length - 1 && (
						<IconButton className={Styles.rightBtn} onClick={handleIndex(1)}>
							<ChevronRight />
						</IconButton>
					)}
				</div>
			)}
		</div>
	)
}

export default SwipeViewer
