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

	// MANEJAR INDEX
	const handleIndex = (add: number) => () =>
		setIndex(Math.min(Math.max(0, index + add), props.images.length - 1))

	// CAMBIAR INDEX
	const changeIndex = (index: number) => setIndex(index)

	return (
		<div className={Styles.container}>
			<SwipeableViews
				enableMouseEvents
				className={Styles.slider}
				index={index}
				onChangeIndex={changeIndex}>
				{props.images.map((pic: string, key: number) => (
					<div key={`picture_${key}`}>
						<Image
							height={450}
							width={450}
							unoptimized
							src={pic}
							alt={props.alts ? props.alts[key] : ''}
						/>
					</div>
				))}
			</SwipeableViews>
			{props.images.length > 1 && (
				<div className={Styles.swipeControls}>
					<IconButton onClick={handleIndex(-1)}>
						<ChevronLeft />
					</IconButton>
					<IconButton onClick={handleIndex(1)}>
						<ChevronRight />
					</IconButton>
				</div>
			)}
		</div>
	)
}

export default SwipeViewer
