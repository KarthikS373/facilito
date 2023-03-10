// REACT
import React, { useContext, useState, Suspense } from 'react'

// COMPONENTES
import CustomersListSkeleton from './components/customersList/components/skeleton'
import CustomersList from './components/customersList'
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
import FormsContext from 'context/forms'

// HOOKS
import { useCustomers, useFilters } from './hooks'
import useDefaultFilter from 'hooks/filters'
import { changeFilter } from 'utils/tools'

const Customers: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// TIENDAS
	const formsCtx = useContext(FormsContext)

	// RESPUESTAS
	const [customers, setCustomers] = useState<CustomerSelf[]>([])

	// FILTROS
	const [filter, setFilter] = useState<string>('iza')

	// ASIGNAR FILTRO
	const changeFilterEv = (newFilter: string) =>
		changeFilter('customers-filter', newFilter, setFilter)

	// FILTRAR
	useFilters(filter, customers, setCustomers)

	// FILTRO INICIAL
	useDefaultFilter('customers-filter', 'iza', setFilter)

	// CARGAR CLIENTES
	useCustomers(formsCtx.forms, setCustomers, businessCtx.business?.id)

	return (
		<View>
			{/* HEADER */}
			<Header
				customDescription={`${
					businessCtx.business?.products?.length || 0
				} ${$`clientes(s) registrados`}`}>
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
			<Suspense fallback={<CustomersListSkeleton />}>
				<CustomersList filter={filter} customers={customers} setFilter={changeFilterEv} />
			</Suspense>
		</View>
	)
}

export default Customers
