/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'
import { useTheme } from '@mui/material/styles'

// NEXT
import Image from 'next/image'
import Link from 'next/link'

// ICONS
import InfoTwoTone from '@mui/icons-material/InfoTwoTone'

// MATERIAL
import IconButton from '@mui/material/IconButton'
import ROUTES from 'router/routes'

// DND
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd'

// UTILS
import { getComponentsItems } from './utils'
import useStrings from 'hooks/lang'

// PROPS
interface SideBarProps {
	onClose?: () => void
	open?: boolean
}

const ComponentsSideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
	// TEMA
	const theme = useTheme()

	// STRINGS
	const { $ } = useStrings()

	// COMPONENTES
	const componentsItems = getComponentsItems($)

	return (
		<>
			<div
				className={`${Styles.container} ${
					open ? Styles.openTabContainer : Styles.closedTabContainer
				}`}>
				<div className={Styles.brand}>
					<div className={Styles.logo}>
						<Link href={ROUTES.forms} passHref>
							<Image unoptimized src='/assets/brand/logo.png' alt='Icon' height={45} width={85} />
						</Link>
					</div>
					<IconButton color='inherit' aria-label='info'>
						<InfoTwoTone />
					</IconButton>
				</div>
				<Droppable droppableId='components' isDropDisabled>
					{(providedDrop: DroppableProvided) => (
						<ul
							ref={providedDrop.innerRef}
							{...providedDrop.droppableProps}
							className={Styles.componentList}>
							{componentsItems.map((item: FormComponentItemProps, key: number) => (
								<Draggable index={key} key={`cItem_${key}`} draggableId={`cItem_${key}`}>
									{(providedDrag) => (
										<>
											{(key === 0 && <h3>{$`Básicos`}</h3>) ||
												(key === 7 && <h3>{$`Secciones`}</h3>) ||
												(key === 9 && <h3>{$`Multimedia`}</h3>) ||
												(key === 11 && <h3>{$`Carrito`}</h3>)}
											<div
												ref={providedDrag.innerRef}
												{...providedDrag.draggableProps}
												{...providedDrag.dragHandleProps}
												className={Styles.itemDrag}>
												<div
													className={Styles.item}
													style={{
														borderColor: theme.palette.primary.main,
														color: theme.palette.primary.main,
													}}>
													{item.icon}
													<p>{item.text}</p>
												</div>
											</div>
										</>
									)}
								</Draggable>
							))}
						</ul>
					)}
				</Droppable>
			</div>
			<div
				className={`${Styles.shadow} ${open ? Styles.openShadow : Styles.closedShadow}`}
				onClick={onClose}
			/>
		</>
	)
}

export default ComponentsSideBar
