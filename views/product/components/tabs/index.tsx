// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

// ICONS
import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'

// COMPONENTES
import Settings from './components/settings'
import General from './components/general'
import Extras from './components/extras'
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
	const handleChange = (_event: unknown, newValue: number) => setTabIndex(newValue)

	return (
		<div className={Styles.container}>
			<Paper style={{ background: '#fcfcfc', width: '540px' }}>
				<Tabs
					value={tabIndex}
					textColor='primary'
					className={Styles.tabs}
					indicatorColor='primary'
					onChange={handleChange}
					aria-label='product_sections'>
					<Tab className={Styles.tab} icon={<InfoTwoToneIcon />} label={$`General`} />
					<Tab className={Styles.tab} icon={<MenuBookTwoToneIcon />} label={$`Catalogo`} />
					<Tab className={Styles.tab} icon={<ExtensionTwoToneIcon />} label={$`Extras`} />
					<Tab className={Styles.tab} icon={<SettingsTwoToneIcon />} label={$`Opciones`} />
				</Tabs>
				<General show={tabIndex === 0} productRef={productRef} />
				<Stock show={tabIndex === 1} productRef={productRef} />
				<Extras show={tabIndex === 2} productRef={productRef} />
				<Settings show={tabIndex === 3} productRef={productRef} />
			</Paper>
		</div>
	)
}

export default CustomTabs
