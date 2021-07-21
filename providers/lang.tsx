// REACT
import { useState, useContext, useEffect } from 'react'

// CONTEXTO
import BusinessContext from 'context/business'
import PortrayContext from 'context/lang'

interface PortrayContextProps {
	settings: {
		mainLang?: string
		langs?: string[]
	}
}

const PortrayProvider: React.FC<PortrayContextProps> = (props) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// ESTADO
	const mainLang: string = props.settings?.mainLang || 'es'
	const [langCode, setLang] = useState<string>(mainLang)

	// INCIAL
	const businessLang: string = businessCtx.business.lang || 'es'
	useEffect(() => {
		setLang(businessLang)
	}, [businessLang])

	// RENDER
	return (
		<PortrayContext.Provider
			value={{
				setLang,
				mainLang,
				langCode,
				langs: props.settings?.langs || ['en', 'es'],
			}}>
			{props.children}
		</PortrayContext.Provider>
	)
}

export default PortrayProvider
