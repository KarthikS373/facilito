// REACT
import { useState } from 'react'

// CONTEXTO
import PortrayContext from 'context/lang'

interface PortrayContextProps {
	settings: {
		mainLang?: string
		langs?: string[]
	}
}

const PortrayProvider: React.FC<PortrayContextProps> = (props) => {
	// ESTADO
	const mainLang: string = props.settings?.mainLang || 'en'
	const [langCode, setLang] = useState<string>(mainLang)

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
