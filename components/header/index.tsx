// REACT
import React, { useContext } from 'react'

// NEXT
import Image from 'next/image'

// COMPONENTES
import Link from 'components/link'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Button from '@material-ui/core/Button'

// ICON
import DescriptionTwoTone from '@material-ui/icons/DescriptionTwoTone'
import VisibilityTwoTone from '@material-ui/icons/VisibilityTwoTone'

// HOC
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

// PROPS
interface HeaderProps {
	customDescription?: string
}

const Header: React.FC<HeaderProps> = ({ children, customDescription }) => {
	// STRINGS
	const { $ } = useStrings()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	return (
		<div className={Styles.container}>
			{/* FONDO */}
			<div
				className={Styles.background}
				style={{
					background:
						businessCtx.business?.backgroundImage === 'none'
							? businessCtx.business?.background
							: '',
				}}>
				{businessCtx.business && businessCtx.business.backgroundImage !== 'none' && (
					<Image
						unoptimized
						src={businessCtx.business.backgroundImage}
						layout='fill'
						alt='Background'
					/>
				)}
			</div>

			<div className={Styles.content}>
				{/* NEGOCIO */}
				<div className={Styles.businessContainer}>
					<div className={Styles.businessPic}>
						{businessCtx.business?.picture && (
							<Image
								unoptimized
								alt='Business'
								src={businessCtx.business?.picture}
								height={150}
								width={150}
							/>
						)}
					</div>
					<div className={Styles.businessInfo}>
						<div>
							<span>@{businessCtx.business?.url}</span>
							<h1>{businessCtx.business?.name}</h1>
						</div>
						<div>
							<div className={Styles.businessSubs}>
								<span>{businessCtx.business?.category}</span>
								<span>{businessCtx.business?.subscription?.plan || $`Plan basico`}</span>
							</div>
							<span>
								{customDescription ||
									`${businessCtx.business?.forms.length || 0} ${$`formulario(s) creados`}`}
							</span>
						</div>
					</div>
				</div>

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<Link rKey='guest' passHref>
						<Button
							fullWidth
							variant='outlined'
							startIcon={<VisibilityTwoTone />}>{$`Ver como visitiante`}</Button>
					</Link>
					{children || (
						<Link rKey='forms' passHref>
							<Button
								color='primary'
								variant='contained'
								style={{ color: '#fff' }}
								startIcon={<DescriptionTwoTone />}>{$`Ir a formularios`}</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
