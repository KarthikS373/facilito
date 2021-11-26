import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Skeleton from '@mui/material/Skeleton'

const ProductSkeleton: React.FC = () => {
	return (
		<div className={Styles.skeleton}>
			<Skeleton variant='rectangular' width={200} height={196} />
			<div>
				<Skeleton variant='text' />
				<Skeleton variant='text' />
				<Skeleton variant='text' />
				<Skeleton variant='text' />
				<Skeleton variant='rectangular' className={Styles.btn} width={170} height={40} />
			</div>
		</div>
	)
}

export default ProductSkeleton
