// REACT
import React, { useContext } from 'react'

// IMAGENES
import Image from 'next/image'

// MATERIAl
import ColorButton from 'components/button'
import Button from '@mui/material/Button'

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
		navigator.clipboard
			.writeText(`<iframe title='facilito_form' src='${`https://${fclt}`}'/>`)
			.then(() => window.Snack('Código copiado'))

	// TEMA
	const theme = useTheme()

	return (
		<div>
			<div className={Styles.info}>
				<p>
					{$`Aquí esta la url completa de tu formulario.`}
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
				<Image height={192} width={192} alt='qr' src={props.formQR} />
				<div className={Styles.btn}>
					<Button fullWidth variant='outlined' onClick={copyIframe}>{$`Insertar codigo`}</Button>
					<ColorButton
						fullWidth
						$style={{ background: theme.palette.primary.main, color: '#fff' }}
						onClick={downloadQREmb}>{$`Descargar QR`}</ColorButton>
				</div>
			</div>
		</div>
	)
}

const showShareMenu = (formQR: string, id: string, url?: string): void => {
	window.Alert({
		title: 'Compartir formulario',
		body: 'Aqui se muestran todas las opciones para mostrar tu formulario al mundo.',
		type: '',
		customElements: <ShareMenu formQR={formQR} url={url} id={id} />,
	})
}

export default showShareMenu
