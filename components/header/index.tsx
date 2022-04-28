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
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'

// ICON
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone'
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone'
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone'

// HOC
import { transformBackground } from 'utils/tools'
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'
import FormsContext from 'context/forms'

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

	// TIENDAS
	const formsCtx = useContext(FormsContext)

	// FONDO
	const background = transformBackground(
		customBackground ?? (businessCtx.business?.background || businessCtx.business?.backgroundImage)
	)

	return (
		<div className={Styles.container}>
			{/* FONDO */}
			<div className={Styles.background} style={{ background }} />

			<div className={Styles.content}>
				{/* NEGOCIO */}
				<div className={Styles.businessContainer}>
					<div className={Styles.businessPic}>
						{businessCtx.business?.picture ? (
							<Image
								unoptimized
								alt='Business'
								src={businessCtx.business?.picture}
								height={150}
								width={150}
							/>
						) : (
							<BusinessCenterTwoToneIcon />
						)}
					</div>
					<div className={Styles.businessInfo}>
						<div>
							<span>
								{businessCtx.business?.url ? (
									`@${businessCtx.business?.url}`
								) : (
									<Skeleton width={250} />
								)}
							</span>
							<h1>{businessCtx.business?.name ?? <Skeleton />}</h1>
						</div>
						<div>
							<div className={Styles.businessSubs}>
								{businessCtx.business?.category ? (
									<span>{businessCtx.business?.category}</span>
								) : (
									<Skeleton />
								)}
								<span>{businessCtx.business?.subscription?.plan || $`Plan basico`}</span>
							</div>
							{businessCtx.business ? (
								<span>
									{customDescription ||
										`${formsCtx.forms.forms.length ?? 0} ${$`tienda(s) creadas`}`}
								</span>
							) : (
								<Skeleton />
							)}
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
