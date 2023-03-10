import React, { useCallback } from 'react'

// MATERIAL
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

// ESTILOS
import Styles from './style.module.scss'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'
import TableHeader from './components/tableHead'
import StockRow from './components/row'

interface StockListProps {
	filter: string
	stockRows: StockHistorySelf[]
	setFilter: (newFilter: string) => void
}

const StockList: React.FC<StockListProps> = ({ stockRows, filter, setFilter }) => {
	const row = useCallback(
		({ index, style }: { index: number; style: React.CSSProperties }) => {
			const newIndex: number = index - 1
			const stockRow: StockHistorySelf = stockRows[newIndex]

			return newIndex === -1 ? (
				<TableHeader key='header_00' style={style} filter={filter} setFilter={setFilter} />
			) : stockRow ? (
				<StockRow data={stockRow} style={style} />
			) : (
				<div className={Styles.stockSkeleton}>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			)
		},
		[filter, setFilter, stockRows]
	)

	return (
		<div className={Styles.container}>
			<TableContainer component={Paper} style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
				<List
					height={272}
					itemSize={68}
					width='100%'
					className={Styles.listContainer}
					itemCount={stockRows.length === 0 ? 4 : stockRows.length + 1}>
					{row}
				</List>
			</TableContainer>
		</div>
	)
}

export default StockList
