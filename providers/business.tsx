// REACT
import React, { useContext, useState } from 'react'

// CONTEXT
import BusinessContext from 'context/business'
import UserContext from 'context/user'

// HOOKS
import useBusiness from 'hooks/business'

const BusinessProvider: React.FC = (props) => {
	// ESTADO
	const [business, setBusiness] = useState<Business | null>(null)

	// MONEDA
	const [badge, setBadge] = useState<string>('GTQ')

	// USER
	const userCtx = useContext(UserContext)

	// OBTENER NEGOCIO
	useBusiness(userCtx.user?.business || null, userCtx.isAnonymous, setBusiness)

	return (
		<BusinessContext.Provider value={{ business, setBusiness, badge, setBadge }}>
			{props.children}
		</BusinessContext.Provider>
	)
}

export default BusinessProvider
