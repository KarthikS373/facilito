// REACT
import React, { useContext } from 'react'

// NEXT
import Image from 'next/image'

// COMPONENTES
import ColorButton from 'components/button'
import Link from 'components/link'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Button from '@mui/material/Button'

// ICON
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone'
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone'

// HOC
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

// PROPS
interface HeaderProps {
	customDescription?: string
	customBackground?: string
}

const Header: React.FC<HeaderProps> = ({ children, customBackground, customDescription }) => {
	// STRINGS
	const { $ } = useStrings()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// FONDO
	const background =
		customBackground ??
		(businessCtx.business?.backgroundImage ? '' : businessCtx.business?.background)

	console.log(customBackground)

	return (
		<div className={Styles.container}>
			{/* FONDO */}
			<div className={Styles.background} style={{ background }}>
				{((customBackground && !customBackground?.startsWith('transparent linear-gradient')) ||
					businessCtx.business?.backgroundImage) && (
					<Image
						unoptimized
						layout='fill'
						alt='Background'
						src={customBackground ?? businessCtx.business?.backgroundImage ?? ''}
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
									`${businessCtx.business?.forms?.length || 0} ${$`tienda(s) creadas`}`}
							</span>
						</div>
					</div>
				</div>

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<a
						target='_blank'
						rel='noreferrer noopener'
						style={{ borderRadius: 'var(--radius)' }}
						title={businessCtx.business?.url ?? ''}
						href={`/e/${businessCtx.business?.url}`}>
						<Button
							fullWidth
							variant='outlined'
							startIcon={<VisibilityTwoTone />}>{$`Ver como visitante`}</Button>
					</a>
					{children || (
						<Link rKey='forms' passHref>
							<ColorButton
								fullWidth
								color='primary'
								variant='contained'
								$style={{ color: '#fff', background: 'var(--primary)' }}
								startIcon={<DescriptionTwoTone />}>{$`Ir a tiendas`}</ColorButton>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
