// REACT
import React, { useContext } from 'react'

// NEXT
import Image from 'next/image'

// ESTILOS
import Styles from './style.module.scss'

// ICONS
import Business from '@mui/icons-material/Business'

// HOOKS
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'
import sendDescription from './tools'

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
	const descriptionHandler = (ev: React.ChangeEvent) =>
		sendDescription(ev, props.onChangeDescription)

	// EMPRESA
	const company = props.company || business

	return (
		<div className={Styles.container}>
			{props.banner.length ? (
				<div className={Styles.banner}>
					<Image layout='fill' height='100%' width='100%' alt='Banner' src={props.banner} />
				</div>
			) : (
				<div className={Styles.defBanner}>
					{!props.clientMode && (
						<>
							<p>{$`Agrega una portada a tu tienda`}</p>
							<span>{$`Haz click en 'Personalizar'`}</span>
						</>
					)}
				</div>
			)}

			<div className={Styles.content}>
				{company?.picture ? (
					<div className={Styles.pic}>
						<Image src={company?.picture} alt='Company Pic' height={100} width={100} />
					</div>
				) : (
					<Business />
				)}
				<h1>{company?.name}</h1>
				<h2>{props.formTitle ?? $`Tienda sin titulo`}</h2>
				{props.clientMode ? (
					<p>{props.formDescription}</p>
				) : (
					<textarea
						rows={3}
						id='description'
						readOnly={props.previewMode}
						onChange={descriptionHandler}
						defaultValue={props.formDescription}
						placeholder={$`Descripción de la tienda`}
						className={props.previewMode ? Styles.previewDescription : undefined}
					/>
				)}
			</div>
		</div>
	)
}

export default FormHeader
