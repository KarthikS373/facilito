import React from 'react'

// COMPONENTS
import FlagPhoneInput from 'components/phoneInput'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// SHARED
import useStrings from 'hooks/lang'
import { inputIcons } from '../icons'

// ESTILOS
import Styles from './style.module.scss'

const NewCompanyForm = (props: NewCompanyFormProps) => {
	// STRINGS
	const { $ } = useStrings()

	// EVITAR RECARGAR
	const preventReload = (ev: React.FormEvent) => ev.preventDefault()

	// LABELS
	const labels = [$`Nombre de tu empresa`, $`Nombre de usuario`]

	// INPUTS
	const ids = ['name', 'url']

	// PLACES
	const placeholders = [$`Mi Negocio`, $`my_business`, $`12345678`]

	// CATEGORIES
	const categories = [
		$`Seleccionar categoría`,
		$`Alimentos y Bebidas`,
		$`Animales y Mascotas`,
		$`Arte`,
		$`Aseguradoras`,
		$`Automotor`,
		$`Bar`,
		$`Bebés y Maternidad`,
		$`Belleza y Cuidado Personal`,
		$`Cafetería`,
		$`Carnicería y Pescadería`,
		$`Carpintería`,
		$`Celulares y Telefonía`,
		$`Cerrajería y Ferretería`,
		$`Cine`,
		$`Coaching`,
		$`Computación e Informática`,
		$`Concesionario`,
		$`Delivery`,
		$`Dentista`,
		$`Deportes y Fitness`,
		$`Diseño gráfico`,
		$`Educación`,
		$`Electrodomésticos`,
		$`Electrónica, Audio y Video`,
		$`Entretenimiento`,
		$`Eventos`,
		$`Farmacia`,
		$`Finanzas`,
		$`Flete y Mudanzas`,
		$`Fotografía y Video`,
		$`Gimnasio`,
		$`Herramientas y Construcción`,
		$`Hogar y Muebles`,
		$`Hospedajes`,
		$`Hostelería`,
		$`Imprenta`,
		$`Inmobiliaria`,
		$`Juegos y Juguetes`,
		$`Kiosco`,
		$`Lavandería`,
		$`Libros, Revistas y Comics`,
		$`Marca personal`,
		$`Marketing y publicidad`,
		$`Médico`,
		$`Música`,
		$`Óptica`,
		$`Otros`,
		$`Panadería y Repostería`,
		$`Películas`,
		$`Redes sociales`,
		$`Relojes y Joyas`,
		$`Restaurante`,
		$`Ropa Interior y Accesorios`,
		$`Ropa de mujer, hombre y niño`,
		$`Salud y Equipamiento Médico`,
		$`Servicio de mensajería`,
		$`Servicio Técnico`,
		$`Servicios Profesionales`,
		$`Supermercado`,
		$`Taxi`,
		$`Tecnología`,
		$`Tienda Online`,
		$`Transporte`,
		$`Universidades`,
		$`Vestuario y Calzado`,
		$`Veterinaria`,
		$`Viajes y Turismo`,
	]

	return (
		<div
			className={Styles.newBrand}
			style={{
				opacity: props.isNewCompany ? '1' : '0.4',
			}}
			onClick={props.changeForm(true)}>
			<h1>{$`Registra tu empresa`}</h1>
			<p>{$`Si eres nuevo en Facilito crea tu empresa, es totalmente gratis y tendrás formularios ilimitados. Solo necesitamos la siguiente información:`}</p>

			<form onSubmit={preventReload}>
				{labels.map((label: string, key: number) => (
					<TextField
						required
						key={key}
						id={ids[key]}
						label={label}
						name={ids[key]}
						placeholder={placeholders[key]}
						onChange={props.saveOnBusinessDataEv}
						InputProps={{
							startAdornment: <InputAdornment position='start'>{inputIcons[key]}</InputAdornment>,
						}}
					/>
				))}
				<FlagPhoneInput
					required
					id='phone'
					name='phone'
					value={props.phone}
					placeholder={placeholders[2]}
					className={Styles.phoneField}
					label={$`Número de teléfono`}
					onChange={props.savePhoneOnBusinessDataEv}
				/>
				<FormControl>
					<InputLabel shrink id='category-label'>
						{$`Categoria`}
					</InputLabel>
					<Select
						fullWidth
						label={$`Categoria`}
						// @ts-ignore
						onChange={props.saveOnBusinessDataEv}
						id='category'
						name='category'
						defaultValue={$`Tecnología`}
						labelId='category-label'>
						{categories.map((option: string, key: number) => (
							<MenuItem disabled={key === 0} key={`category_${key}`} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</form>
		</div>
	)
}

export default NewCompanyForm
