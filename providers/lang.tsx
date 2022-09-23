// REACT
import React, { useState, useContext, useEffect } from 'react'

// ROUTER
import { useRouter } from 'next/router'

// CONTEXTO
import BusinessContext from 'context/business'
import PortrayContext from 'context/lang'

interface PortrayContextProps {
	settings: {
		mainLang?: string
		langs?: string[]
	}
	children: React.ReactNode
}

const PortrayProvider: React.FC<PortrayContextProps> = (props) => {
	// HISTORY
	const router = useRouter()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// ESTADO
	const mainLang: string = props.settings?.mainLang || 'es'
	const [langCode, setLang] = useState<string>(mainLang)

	// INICIAL
	const path = router.asPath
	const businessLang: string = businessCtx.business?.lang || 'es'
	useEffect(() => {
		if (!path.match(/\/f\/.+\/.+$/)) {
			setLang(businessLang)
		}
	}, [businessLang, path])

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
