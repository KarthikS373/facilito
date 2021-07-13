// REACT
import { useState } from 'react'

// CONTEXTO
import PortrayContext from 'context/lang'

interface PortrayContextProps {
	strings: PortrayDict
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
				langCode,
				setLang,
				mainLang,
				strings: props.strings,
				langs: props.settings?.langs || ['en', 'es'],
			}}>
			{props.children}
		</PortrayContext.Provider>
	)
}

export default PortrayProvider
