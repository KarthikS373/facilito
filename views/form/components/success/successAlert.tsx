// REACT
import React from 'react'

// MATERIAL
import FileCopy from '@mui/icons-material/FileCopyTwoTone'

// ICONS
import IconButton from '@mui/material/IconButton'

// TOOLS
import { openNewWindow } from 'utils/tools'

// ALERTA DE ENVIADOS
const successAlert = (
	formData: Form | null,
	companyURL: string,
	formURL: string,
	index: number,
	$: TemplateStrBuilder
): void => {
	const copyUrl = () =>
		navigator.clipboard.writeText(
			`https://facilito-dev.web.app/l/${companyURL}/${formURL}/?index=${index - 1}`
		)

	window.Alert({
		title: 'Respuestas enviadas',
		body: `${$`Gracias por responder, se guardaron tus respuestas correctamente, puedes cerrar esta tienda si deseas`}.${
			formData?.tracking?.length ? $`¿Deseas ver tu orden en tiempo real?` : ''
		}`,
		customElements: formData?.tracking?.length ? (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: ' 5px 0px 5px 10px',
					background: ' rgba(0,0,0,.1)',
					marginTop: '15px',
					borderRadius: '10px',
				}}>
				<span
					style={{
						display: 'inline-block',
						width: ' 85%',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}>{`https://facilito-dev.web.app/l/${companyURL}/${formURL}/?index=${index - 1}`}</span>
				<IconButton onClick={copyUrl}>
					<FileCopy />
				</IconButton>
			</div>
		) : (
			<></>
		),
		onConfirm: () => {
			if (formData?.tracking?.length)
				openNewWindow(`${window.location.origin}/l/${companyURL}/${formURL}/?index=${index - 1}`)
		},
		type: formData?.tracking?.length ? 'confirm' : 'window',
	})
}

export default successAlert
