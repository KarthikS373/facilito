// REACT
import React, { MouseEvent, useContext } from 'react'

// IMAGENES
import Image from 'next/image'

// MATERIAL
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Fade from '@mui/material/Fade'

// ICONOS
import GetApp from '@mui/icons-material/GetApp'
import Share from '@mui/icons-material/Share'
import Code from '@mui/icons-material/Code'

// HOOKS
import useStrings from 'hooks/lang'

// TOOLS
import { copyToClipboard, downloadQR, shareLink } from 'utils/tools'

// COMPONENTES
import FormFrame from './components/formFrame'
import BusinessContext from 'context/business'

interface ShareMenuProps {
	shareOptions: HTMLElement | null
	onClose: EmptyFunction
	formQR: string
	open: boolean
	url?: string
	id: string
}

const ShareMenu: React.FC<ShareMenuProps> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	// EMPRESA
	const { business } = useContext(BusinessContext)

	// COPIAR LINK
	const shareForm = (ev: MouseEvent) => {
		if ('share' in navigator) {
			window.Alert({
				title: 'Compartir formulario',
				body: 'Espera un momento, se esta cargando el link de tu formulario...',
				type: 'window',
				fixed: false,
			})
			shareLink(ev, 'Facilito APP', 'Responde este formulario en Facilito-APP')
		} else
			copyToClipboard(
				ev,
				$`Compartir formulario`,
				'',
				<div>
					<p>
						{$`Aquí esta la url completa de tu formulario.`}
						<br />
						<a
							style={{ display: 'block', marginTop: '10px', color: 'var(--lightblue)' }}
							target='_blank'
							rel='noopener noreferrer'
							href={`${window.location.origin}/f/${business?.url}/${props.url}`}
							title='FormURL'>{`${window.location.origin}/f/${business?.url}/${props.url}`}</a>
						<br />
					</p>
					<p>
						{$`También puedes compartir la url en un link corto.`}
						<br />
						<a
							style={{ display: 'block', marginTop: '10px', color: 'var(--lightblue)' }}
							target='_blank'
							rel='noopener noreferrer'
							href={`https://${fclt}`}
							title='Short Link'>
							{fclt}
						</a>
					</p>
				</div>,
				`${window.location.origin}/f/${business?.url}/${props.url}`
			)

		// CERRAR
		props.onClose()
	}

	// CREAR IFRAME
	const copyIFrame = (ev: MouseEvent) => {
		// GUARDAR SIZE
		const url = `${window.location.origin}/f/${business?.url}/${props.url}`
		let iFrameSize = "width='300' height='400'"
		const saveSize = (w: string, h: string) => (iFrameSize = `width='${w}' height='${h}'`)

		// COMPONENTE
		window.Alert({
			title: $`Insertar formulario`,
			body: '',
			type: 'confirm',
			confirmText: $`Copiar código`,
			onHide: props.onClose,
			onConfirm: () => {
				// CREAR Y COPIAR IFRAME
				const iframeCode = `<iframe src='${url}' ${iFrameSize} title='${props.url}'/>`
				copyToClipboard(
					ev,
					$`Código copiado`,
					$`El código de tu formulario para insertar se ha copiado correctamente a tu portapapeles.`,
					undefined,
					iframeCode
				)
			},
			customElements: <FormFrame url={url} onSize={saveSize} />,
		})
	}

	// CERRAR
	const handlePublishOptionsClose = () => props.onClose()

	// DESCARGAR QR
	const downloadQREmb = () => downloadQR(props.formQR, props.id)

	// FCLT
	const fclt = `fclt.cc/${props.url}`

	return (
		<Menu
			keepMounted
			id='share-menu'
			anchorEl={props.shareOptions}
			open={props.open}
			TransitionComponent={Fade}
			onClose={handlePublishOptionsClose}>
			<MenuItem onClick={shareForm}>
				<Share />
				{$`Compartir enlace`}
			</MenuItem>
			<MenuItem onClick={copyIFrame}>
				<Code />
				{$`Insertar formulario`}
			</MenuItem>
			<MenuItem onClick={downloadQREmb}>
				<div>
					<GetApp />
					{$`Descargar código QR`}
				</div>
				<Image src='/assets/brand/logo.png' unoptimized alt='Form QR' height={30} width={30} />
			</MenuItem>
		</Menu>
	)
}

export default ShareMenu
