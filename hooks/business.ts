// TOOLS
import React, { useEffect } from 'react'
import { getCompany } from 'utils/business'

/**
 * Hook de Business
 * @param  {string|null} userBusiness
 * @param  {boolean} isAnonymous
 * @param  {React.Dispatch<React.SetStateAction<Business|null>>} setBusiness
 * @description Retorna la empresa asociada a un usuario
 */
const useBusiness = (
	userBusiness: string | null,
	isAnonymous: boolean,
	setBusiness: React.Dispatch<React.SetStateAction<Business | null>>
) => {
	// FETCH
	useEffect(() => {
		if (userBusiness && !isAnonymous) getCompany(userBusiness).then(setBusiness)
	}, [userBusiness])
}

// EXPORT
export default useBusiness