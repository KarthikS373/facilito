// REACT
import React, { useContext, Suspense, useState } from 'react'

// COMPONENTES
import StockListItemSkeleton from './components/stockList/components/skeleton'
import Header from 'components/header'
import Info from './components/info'
import View from 'components/view'

// MATERIAL
import ColorButton from 'components/button'

// ICONS
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone'

// STRINGS
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

import dynamic from 'next/dynamic'
import useDefaultFilter from 'hooks/filters'
import { changeFilter } from 'utils/tools'

const StockList = dynamic(() => import('./components/stockList'), {
	suspense: true,
})

const Stock: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// FILTRO
	const [filter, setFilter] = useState<string>('naz')

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// ASIGNAR FILTRO
	const changeFilterEv = (newFilter: string) => changeFilter('stock-filter', newFilter, setFilter)

	// HOOK DE FILTROS STORAGE
	useDefaultFilter('stock-filter', 'naz', setFilter)

	return (
		<View>
			{/* HEADER */}
			<Header
				customDescription={`${
					businessCtx.business?.products?.length || 0
				} ${$`producto(s) creados`}`}>
				<ColorButton
					color='primary'
					variant='contained'
					startIcon={<FileDownloadTwoToneIcon />}
					$style={{
						background: 'var(--primary)',
						color: '#fff',
					}}>{$`Descargar datos`}</ColorButton>
			</Header>

			{/* INFO */}
			<Info />

			{/* LISTA DE INVENTARIO */}
			<Suspense fallback={<StockListItemSkeleton />}>
				<StockList filter={filter} setFilter={changeFilterEv} />
			</Suspense>
		</View>
	)
}

export default Stock
