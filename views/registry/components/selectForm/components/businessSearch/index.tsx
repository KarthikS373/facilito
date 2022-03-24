// REACT
import React, { useState } from 'react'

// HOOKS
import { useBusinessList } from 'hooks/business'
import useStrings from 'hooks/lang'

// ICONS
import Search from '@mui/icons-material/Search'
import Close from '@mui/icons-material/Close'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

// ESTILOS
import Styles from './style.module.scss'

// PROPS
interface SearchProps {
	onSelect: (business: Business) => unknown
	onClear: (reset: null) => unknown
}

const BusinessSearch: React.FC<SearchProps> = ({ onSelect, onClear }: SearchProps) => {
	// STRINGS
	const { $ } = useStrings()

	// NEGOCIO ACTUAL
	const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null)

	// BUSQUEDA
	const [businessSearch, setBusinessSearch] = useState<string>('')

	// LISTA DE EMPRESAS
	const [businessList, setBusinessList] = useState<Business[]>([])

	// ACTUALIZAR TÉRMINOS DE BÚSQUEDA
	// TODO: reset()
	const saveSearch = (ev: React.ChangeEvent<HTMLInputElement>) => setBusinessSearch(ev.target.value)

	// USAR LISTA DE EMPRESAS
	useBusinessList(setBusinessList)

	// FILTRO
	const businessListFiltered: Business[] = businessList.filter((business: Business) => {
		if (
			businessSearch.length > 0 &&
			(business.name.includes(businessSearch) || business.url.includes(businessSearch))
		)
			return business
		else return undefined
	})

	// REINICIAR BÚSQUEDA
	const resetSearch = () => {
		onClear(null)
		setCurrentBusiness(null)
		setBusinessSearch('')
	}

	// ENVIAR DATOS
	const sendData = (business: Business) => () => {
		setCurrentBusiness(business)
		onSelect(business)
	}

	return (
		<div className={Styles.container}>
			{currentBusiness === null && (
				<TextField
					required
					fullWidth
					id='business'
					type='search'
					autoComplete='off'
					onChange={saveSearch}
					label={$`Nombre de la empresa`}
					placeholder={$`Mi Negocio`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Search color='primary' />
							</InputAdornment>
						),
					}}
				/>
			)}
			{currentBusiness && (
				<div className={`${Styles.item} ${Styles.current}`}>
					<div>
						<strong>{currentBusiness.name}</strong>
						<span>@{currentBusiness.url}</span>
					</div>
					<IconButton aria-label='delete' color='primary' onClick={resetSearch}>
						<Close />
					</IconButton>
				</div>
			)}
			<div className={Styles.list}>
				{currentBusiness === null &&
					businessListFiltered.map(
						(business: Business, key: number) =>
							key < 3 && (
								<div className={Styles.item} key={key} onClick={sendData(business)}>
									<p>
										<strong>{business.name}</strong>
									</p>
									<span>@{business.url}</span>
								</div>
							)
					)}
			</div>
		</div>
	)
}

export default BusinessSearch
