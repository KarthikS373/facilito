import React from 'react'

// MATERIAL
import TableContainer from '@mui/material/TableContainer'

import Paper from '@mui/material/Paper'

// ESTILOS
import Styles from './style.module.scss'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'
import TableHeader from './components/tableHead'

interface StockListProps {
	filter: string
	setFilter: (newFilter: string) => void
}
const StockList: React.FC<StockListProps> = ({ filter, setFilter }) => {
	return (
		<div className={Styles.container}>
			<TableContainer component={Paper} style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
				<List height={272} itemSize={68} width='100%' itemCount={1}>
					{({ style }) => (
						<TableHeader style={style} key='header_00' filter={filter} setFilter={setFilter} />
					)}
				</List>
			</TableContainer>
		</div>
	)
}

export default StockList
