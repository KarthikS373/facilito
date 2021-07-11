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

	// USER
	const userCtx = useContext(UserContext)

	// OBTENER NEGOCIO
	useBusiness(userCtx.user?.email || null, userCtx.isAnonymous, setBusiness)

	return (
		<BusinessContext.Provider value={{ business, setBusiness }}>
			{props.children}
		</BusinessContext.Provider>
	)
}

export default BusinessProvider
