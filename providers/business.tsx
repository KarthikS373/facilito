// REACT
import React, { useContext, useState } from 'react'

// CONTEXT
import BusinessContext from 'context/business'
import UserContext from 'context/user'

// HOOKS
import useBusiness from 'hooks/business'

// UTILS
import { replaceBusiness } from 'utils/business'

const BusinessProvider: React.FC = (props) => {
	// ESTADO
	const [business, setBusiness] = useState<Business | null>(null)

	// USER
	const userCtx = useContext(UserContext)

	// OBTENER NEGOCIO
	useBusiness(userCtx.user?.business || null, userCtx.isAnonymous, setBusiness)

	// GUARDAR NEGOCIO GLOBAL
	const setBusinessDB = (business: Partial<Business>) =>
		setBusiness((prevBusiness: Business) => {
			const newBusiness: Business = { ...prevBusiness, ...business }
			replaceBusiness(prevBusiness.id, newBusiness)
			return newBusiness
		})

	return (
		<BusinessContext.Provider value={{ business, setBusiness, setBusinessDB }}>
			{props.children}
		</BusinessContext.Provider>
	)
}

export default BusinessProvider
