import React from 'react'

// MATERIAL
import TableContainer from '@mui/material/TableContainer'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

// ESTILOS
import Styles from './style.module.scss'

const StockListItemSkeleton: React.FC = () => (
	<Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
		<Skeleton height={50} width='50%' sx={{ transform: 'none' }} />
		<Skeleton height={50} width='50%' sx={{ transform: 'none' }} />
		<Skeleton height={50} width='50%' sx={{ transform: 'none' }} />
		<Skeleton height={50} width='50%' sx={{ transform: 'none' }} />
		<Skeleton height={50} width='50%' sx={{ transform: 'none' }} />
		<Skeleton height={50} width={50} sx={{ minWidth: '50px', transform: 'none' }} />
	</Stack>
)

const StockListSkeleton: React.FC = () => {
	return (
		<div className={Styles.container}>
			<TableContainer
				component={Paper}
				sx={{ height: 272, padding: 2, backgroundColor: 'rgb(252, 252, 252)' }}>
				<Skeleton height={55} width='100%' sx={{ mb: 1, transform: 'none' }} />
				<StockListItemSkeleton />
				<StockListItemSkeleton />
				<StockListItemSkeleton />
			</TableContainer>
		</div>
	)
}

export default StockListSkeleton
