// REACT
import React, { useContext } from 'react'

// IMAGENES
import Image from 'next/image'

// MATERIAl
import Button from '@mui/material/Button'

// ICONOS
import DownloadIcon from '@mui/icons-material/DownloadTwoTone'
import LinkIcon from '@mui/icons-material/LinkTwoTone'
import Code from '@mui/icons-material/CodeTwoTone'

// HOOKS
import useStrings from 'hooks/lang'

// TOOLS
import { downloadQR } from 'utils/tools'

// COMPONENTES
import BusinessContext from 'context/business'

// ESTILOS
import Styles from './style.module.scss'
import { useTheme } from '@mui/material/styles'

interface ShareMenuProps {
	formQR: string
	url?: string
	id: string
}

const ShareMenu: React.FC<ShareMenuProps> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	// EMPRESA
	const { business } = useContext(BusinessContext)

	// DESCARGAR QR
	const downloadQREmb = () => downloadQR(props.formQR, props.id)

	// FCLT
	const fclt = `fclt.cc/${props.url}`

	// COPIAR IFRAME
	const copyIframe = () =>
		navigator?.clipboard
			.writeText(`<iframe title='facilito_form' src='${`https://${fclt}`}'/>`)
			.then(() => window.Snack('Código copiado'))

	// COPIAR LINK
	const copyLink = () =>
		navigator?.clipboard.writeText(`https://${fclt}`).then(() => window.Snack('Link copiado'))

	// TEMA
	const theme = useTheme()

	return (
		<div>
			<div className={Styles.info}>
				<p>
					{$`Aquí esta la url completa de tu tienda.`}
					<a
						target='_blank'
						rel='noopener noreferrer'
						className={Styles.link}
						href={`${window.location.origin}/f/${business?.url}/${props.url}`}
						style={{ color: theme.palette.primary.main }}
						title='FormURL'>{`${window.location.origin}/f/${business?.url}/${props.url}`}</a>
					<br />
				</p>
				<p>
					{$`También puedes compartir la url en un link corto.`}

					<a
						target='_blank'
						title='Short Link'
						rel='noopener noreferrer'
						href={`https://${fclt}`}
						style={{ color: theme.palette.primary.main }}
						className={Styles.link}>
						{fclt}
					</a>
				</p>
			</div>
			<div className={Styles.actions}>
				<Image unoptimized height={192} width={192} alt='qr' src={props.formQR} />
				<div className={Styles.btn}>
					<Button
						startIcon={<LinkIcon />}
						fullWidth
						variant='outlined'
						onClick={copyLink}>{$`Copiar link`}</Button>
					<Button
						startIcon={<Code />}
						fullWidth
						variant='outlined'
						onClick={copyIframe}>{$`Insertar codigo`}</Button>
					<Button
						fullWidth
						startIcon={<DownloadIcon />}
						variant='outlined'
						onClick={downloadQREmb}>{$`Descargar QR`}</Button>
				</div>
			</div>
		</div>
	)
}

const showShareMenu = (form: React.MutableRefObject<Form>): void => {
	window.Alert({
		title: 'Compartir tienda',
		body: 'Aqui se muestran todas las opciones para mostrar tu tienda al mundo.',
		type: '',
		customElements: (
			<ShareMenu formQR={form.current.qr} url={form.current.url} id={form.current.id} />
		),
	})
}

export default showShareMenu
