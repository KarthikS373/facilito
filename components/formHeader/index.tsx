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

// PROPS
interface FormHeaderProps {
	onChangeDescription?: (text: string) => unknown
	formDescription?: string
	previewMode?: boolean
	formTitle?: string
	clientMode?: boolean
	banner: string
	company?: Business
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

	// EMPRESA
	const company = props.company || business

	return (
		<div className={Styles.container}>
			{props.banner.length > 0 ? (
				<Image
					unoptimized
					src={props.banner}
					layout='fill'
					alt='Banner'
					className={Styles.banner}
				/>
			) : (
				<div className={Styles.defBanner}>
					{!props.clientMode && (
						<>
							<p>{$`title`}</p>
							<span>{$`Desc`}</span>
						</>
					)}
				</div>
			)}

			<div className={Styles.content}>
				{company?.picture ? (
					<div className={Styles.pic}>
						<Image unoptimized src={company?.picture} alt='Company Pic' height={100} width={100} />
					</div>
				) : (
					<Business />
				)}
				<h1>{company?.name}</h1>
				<h2>{props.formTitle || $`Formulario sin titulo`}</h2>
				{props.clientMode ? (
					<p>{props.formDescription}</p>
				) : (
					<textarea
						readOnly={props.previewMode}
						defaultValue={props.formDescription}
						rows={3}
						id='description'
						placeholder={$`desc`}
						onChange={sendDescription}
						className={props.previewMode ? Styles.previewDescription : undefined}
					/>
				)}
			</div>
		</div>
	)
}

export default FormHeader
