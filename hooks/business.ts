// TOOLS
import React, { useEffect, useState } from 'react'
import { getCompany } from 'utils/business'

// HOOKS
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
