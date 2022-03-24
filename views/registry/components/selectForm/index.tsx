// REACT
import React from 'react'

// COMPONENTES
import BusinessSearch from './components/businessSearch'

// HOOKS
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

// PROPIEDADES
const SelectBusinessForm = (props: SelectBusinessFormProps) => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<div
			className={Styles.newBrand}
			onClick={props.changeForm(false)}
			style={{
				opacity: !props.isNewCompany ? '1' : '0.4',
			}}>
			<h1>{$`Busca tu empresa`}</h1>
			<p>{$`Si ya perteneces a una empresa registrada en Facilito, puedes buscarla y solicitar tu admisión al administrador.`}</p>

			{/* BUSCADOR POR EMPRESAS */}
			<BusinessSearch onSelect={props.setSelectedBusiness} onClear={props.setSelectedBusiness} />

			{/* MENSAJE DE CORREO */}
			{!props.isNewCompany && props.selectedBusiness && (
				<p>
					{$`Ahora presiona el botón de `} <strong>{$`Continuar`}</strong>{' '}
					{$` y enviaremos un correo a `} <strong>{props.selectedBusiness?.name}</strong>
				</p>
			)}
		</div>
	)
}

export default SelectBusinessForm
