// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

// ICONS
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone'
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone'

// COMPONENTES
import General from './components/general'
import Stock from './components/stock'

// HOOKS
import useStrings from 'hooks/lang'

// PROPS
interface CustomTabsProps {
	productRef: React.MutableRefObject<Product>
}
const CustomTabs: React.FC<CustomTabsProps> = ({ productRef }) => {
	// ESTADOS
	const [tabIndex, setTabIndex] = useState<number>(0)

	// STRINGS
	const { $ } = useStrings()

	// ACTUALIZAR
	const handleChange = (_event, newValue: number) => setTabIndex(newValue)

	return (
		<div className={Styles.container}>
			<Paper style={{ background: '#fcfcfc', width: '600px' }}>
				<Tabs
					value={tabIndex}
					textColor='primary'
					className={Styles.tabs}
					indicatorColor='primary'
					onChange={handleChange}
					aria-label='product_sections'>
					<Tab className={Styles.tab} icon={<InfoTwoToneIcon />} label={$`Información`} />
					<Tab className={Styles.tab} icon={<MenuBookTwoToneIcon />} label={$`Catalogo`} />
					<Tab label='Active' />
				</Tabs>
				<General show={tabIndex === 0} productRef={productRef} />
				<Stock show={tabIndex === 1} productRef={productRef} />
			</Paper>
		</div>
	)
}

export default CustomTabs
