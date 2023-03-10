// REACT
import React, { useCallback } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import TableHead from './components/tableHead'
import CustomerRow from './components/row'

// MATERIAL
import TableContainer from '@mui/material/TableContainer'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'

interface CustomersListProps {
	filter: string
	customers: CustomerSelf[]
	setFilter: (newFilter: string) => void
}

const CustomersList: React.FC<CustomersListProps> = ({ filter, setFilter, customers }) => {
	const row = useCallback(
		({ index, style }: { index: number; style: React.CSSProperties }) => {
			const newIndex: number = index - 1
			const customer: CustomerSelf = customers[newIndex]

			return newIndex === -1 ? (
				<TableHead key='header_00' style={style} filter={filter} setFilter={setFilter} />
			) : customer ? (
				<CustomerRow {...customer} style={style} />
			) : (
				<div className={Styles.customersSkeleton}>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			)
		},
		[filter, setFilter, customers]
	)

	return (
		<div className={Styles.container}>
			<TableContainer component={Paper} style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
				<List
					height={272}
					itemSize={68}
					width='100%'
					className={Styles.listContainer}
					itemCount={customers.length === 0 ? 4 : customers.length + 1}>
					{row}
				</List>
			</TableContainer>
		</div>
	)
}

export default CustomersList
