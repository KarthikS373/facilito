// REACT
import React, { useContext } from 'react'

// MATERIAL
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// CONTEXTOS
import BusinessContext from 'context/business'

// HELPERS
import { badgeList, badgePrefix } from '../../utils/tools'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'

// PROPS
interface BadgeMenuProps {
	anchorEl: HTMLElement | null
	onClose: EmptyFunction
	open: boolean
}

const BadgeMenu: React.FC<BadgeMenuProps> = ({ anchorEl, onClose, open }) => {
	// EMPRESA
	const businessCtx = useContext(BusinessContext)

	// CAMBIAR MONEDA
	const changeBadge = (badge: string) => () => {
		businessCtx && businessCtx.setBusinessDB({ badge })
		onClose()
	}

	return (
		<PopperMenuList
			open={open}
			disablePortal
			onClose={onClose}
			anchorEl={anchorEl}
			placement='bottom-end'>
			{badgeList.map((cBadge: string, key: number) => (
				<MenuItem key={`badge_${key}`} onClick={changeBadge(`${cBadge}${badgePrefix[key]}`)}>
					<Button
						style={{ height: '40px' }}
						startIcon={<strong>{cBadge}</strong>}
						fullWidth
						variant='outlined'>
						{badgePrefix[key]}
					</Button>
				</MenuItem>
			))}
		</PopperMenuList>
	)
}

export default BadgeMenu
