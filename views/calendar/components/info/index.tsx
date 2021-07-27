// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import EventAvailableTwoTone from '@material-ui/icons/EventAvailableTwoTone'
import DynamicFeedTwoTone from '@material-ui/icons/DynamicFeedTwoTone'

// MATERIAL
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'

// STRINGS
import withStrings from 'hoc/lang'

interface InfoProps {
	viewState: string
	changeView: (view: string) => () => unknown
}
const Info: React.FC<InfoProps> = withStrings(({ $, viewState, changeView }) => {
	// MENU
	const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null)
	const openOptionsMenu = Boolean(optionsAnchor)

	// ABRIR
	const handleOptionsMenu = (ev: React.MouseEvent<HTMLElement>) =>
		setOptionsAnchor(ev.currentTarget)

	// CERRAR
	const closeOptionsMenu = () => setOptionsAnchor(null)

	return (
		<>
			<div className={Styles.container}>
				<div className={Styles.info}>
					<EventAvailableTwoTone />
					<div className={Styles.text}>
						<h2>{$`Calendario y eventos`}</h2>
						<p>{$`Administra los eventos creados desde todos tus formularios.`}</p>
					</div>
				</div>
				<div className={Styles.actions}>
					<Button
						fullWidth
						variant='outlined'
						onClick={handleOptionsMenu}
						startIcon={<DynamicFeedTwoTone />}>
						{$`Vista como `}
						{(viewState === 'Month' && $`Mes`) ||
							(viewState === 'Week' && $`Semana`) ||
							(viewState === 'Day' && $`Día`)}
					</Button>
				</div>
			</div>
			<PopperMenuList
				style={{ zIndex: 3 }}
				anchorEl={optionsAnchor}
				open={openOptionsMenu}
				onClose={closeOptionsMenu}>
				<MenuItem>
					<Button fullWidth variant='outlined' onClick={changeView('Month')}>
						{$`Mes`}
					</Button>
				</MenuItem>
				<MenuItem>
					<Button fullWidth variant='outlined' onClick={changeView('Week')}>
						{$`Semana`}
					</Button>
				</MenuItem>
				<MenuItem>
					<Button fullWidth variant='outlined' onClick={changeView('Day')}>
						{$`Día`}
					</Button>
				</MenuItem>
			</PopperMenuList>
		</>
	)
})

export default Info
