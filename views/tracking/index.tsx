// REACT
import { useState } from 'react'

// UTILS
import useDefaultFilter from 'hooks/filters'
import { changeFilter } from 'utils/tools'

// COMPONENTES
import FormList from './components/formList'
import Header from 'components/header'

// STRINGS
import withStrings from 'hoc/lang'

// ICON
import SortByAlphaTwoTone from '@material-ui/icons/SortByAlphaTwoTone'

// MATERIAL
import Button from '@material-ui/core/Button'

const Tracking: React.FC = withStrings(({ $ }) => {
	// FILTRO
	const [filter, setFilter] = useState<string>('asc')

	// CAMBIAR FILTRO
	const changeFilterEv = () =>
		changeFilter('tracking-filter', filter === 'asc' ? 'des' : 'asc', setFilter)

	// ASIGNAR FILTRO DE INICIO
	useDefaultFilter('tracking-filter', 'asc', setFilter)

	return (
		<>
			<Header>
				<Button
					fullWidth
					variant='outlined'
					onClick={changeFilterEv}
					style={{ backgroundColor: '#fbfbfb' }}
					startIcon={<SortByAlphaTwoTone />}>
					{filter === 'asc' ? $`Filtrar ascendente` : $`Filtrar desendente`}
				</Button>
			</Header>
			<FormList filter={filter} />
		</>
	)
})

export default Tracking
