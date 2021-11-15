// REACT
import React, { useState, useContext } from 'react'

// NEXT
import Image from 'next/image'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Button from '@mui/material/Button'

// ICONOS
import PersonTwoTone from '@mui/icons-material/PersonTwoTone'
import MoreVert from '@mui/icons-material/MoreVert'

// COMPONENTES
import AccountMenu from './components/accountMenu'

// CONTEXTOS
import UserContext from 'context/user'

interface AccountButtonProps {
	disablePortal?: boolean
}
const AccountButton: React.FC<AccountButtonProps> = ({ disablePortal }) => {
	// USUARIO
	const userCtx = useContext(UserContext)

	// MENU DE CUENTA
	const [accountMenu, setAccountMenu] = useState<HTMLElement | null>(null)
	const openAccountMenu = Boolean(accountMenu)

	// CERRAR MENU DE CUENTA
	const closeAccountMenu = () => setAccountMenu(null)

	// ABRIR MENU
	const openAccountMenuEv = (ev: React.MouseEvent<HTMLButtonElement>) =>
		setAccountMenu(ev.currentTarget)

	return (
		<>
			<Button
				variant='outlined'
				aria-label='account'
				onClick={openAccountMenuEv}
				className={Styles.accountBtn}
				endIcon={<MoreVert />}
				startIcon={
					<div className={Styles.accountPic}>
						{userCtx.user?.picture ? (
							<Image unoptimized src={userCtx.user?.picture} alt='UserPic' height={30} width={30} />
						) : (
							<PersonTwoTone />
						)}
					</div>
				}>
				<div className={Styles.accountBtnContent}>
					<span>{userCtx.user?.name.split(' ')[0]?.toUpperCase()}</span>
					<span>{userCtx.user?.role}</span>
				</div>
			</Button>

			{/* MENU DE CUENTA */}
			<AccountMenu
				disablePortal={disablePortal ?? true}
				onClose={closeAccountMenu}
				open={openAccountMenu}
				anchorEl={accountMenu}
			/>
		</>
	)
}

AccountButton.defaultProps = {
	disablePortal: true,
}

export default AccountButton
