// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONS
import Business from '@mui/icons-material/Business'

// NEXT
import Image from 'next/image'

// CONTEXTO
import BusinessContext from 'context/business'
import useStrings from 'hooks/lang'

// PROPS
interface FormHeaderProps {
	onChangeDescription?: (text: string) => unknown
	formDescription?: string
	previewMode?: boolean
	clientMode?: boolean
	formTitle?: string
	company?: Business
	banner: string
}

const FormHeader: React.FC<FormHeaderProps> = (props: FormHeaderProps) => {
	// EMPRESA
	const { business } = useContext(BusinessContext)

	// STRINGS
	const { $ } = useStrings()

	// ENVIAR DESCRIPCIÓN
	const sendDescription = (ev: React.ChangeEvent) => {
		// INPUT
		const inp = ev.target as HTMLInputElement
		const val: string = inp.value.trim()

		// ENVIAR
		props.onChangeDescription && props.onChangeDescription(val)
	}

	const company = props.company || business

	return (
		<div className={Styles.container}>
			{/* BANNER */}
			{props.banner.length > 0 ? (
				<Image src={props.banner} alt='Banner' layout='fill' className={Styles.banner} />
			) : (
				<div className={Styles.defBanner}>
					{!props.clientMode && (
						<>
							<p>{$`Titulo`}</p>
							<span>{$`Banner`}</span>
						</>
					)}
				</div>
			)}

			<div className={Styles.content}>
				{/* IMAGEN DE EMPRESA */}
				{company?.picture ? (
					<Image src={company?.picture} alt='Company Pic' height={100} width={100} />
				) : (
					<Business />
				)}

				{/* INFORMACIÓN DE EMPRESA */}
				<h1>{company?.name}</h1>
				<h2>{props.formTitle || $`Titulo`}</h2>
				{props.clientMode ? (
					<p>{props.formDescription}</p>
				) : (
					<textarea
						rows={3}
						id='description'
						onChange={sendDescription}
						placeholder={$`Descripcion`}
						readOnly={props.previewMode}
						defaultValue={props.formDescription}
						className={props.previewMode ? Styles.previewDescription : undefined}
					/>
				)}
			</div>
		</div>
	)
}

export default FormHeader
