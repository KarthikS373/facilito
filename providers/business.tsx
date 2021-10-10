// REACT
import React, { useContext, useState } from 'react'

// CONTEXT
import BusinessContext from 'context/business'
import UserContext from 'context/user'
import AuthContext from 'context/auth'

// HOOKS
import useBusiness from 'hooks/business'

// UTILS
import { replaceBusiness } from 'utils/business'

const BusinessProvider: React.FC = (props) => {
	// ESTADO
	const [business, setBusiness] = useState<Business | null>(null)

	// USER
	const auth = useContext(AuthContext)
	const userCtx = useContext(UserContext)

	// OBTENER NEGOCIO
	useBusiness(auth.userExists, userCtx.user?.business || null, setBusiness)

	// GUARDAR NEGOCIO GLOBAL
	const setBusinessDB = (business: Partial<Business>) =>
		setBusiness((prevBusiness: Business | null) => {
			if (prevBusiness) {
				// COPIAR
				const newBusiness: Business = { ...prevBusiness, ...business }

				// GUARDAR
				window.Snack('Guardando...')
				replaceBusiness(prevBusiness.id, newBusiness).then(() =>
					window.Snack('Guardado correctamente')
				)

				// ACTUALIZAR
				return newBusiness
			} else return null
		})

	return (
		<BusinessContext.Provider value={{ business, setBusiness, setBusinessDB }}>
			{props.children}
		</BusinessContext.Provider>
	)
}

export default BusinessProvider
