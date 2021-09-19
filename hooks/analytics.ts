// REACT
import { useEffect } from 'react'

// UTILS
import getFirebase from 'keys/firebase'
import { initializeAnalytics } from 'firebase/analytics'

/**
 * Hook de Analytics
 * @description Inicia firebase analytics de manera segura (client side)
 */
const useAnalytics = () => {
	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			getFirebase().then((firebaseApp) => initializeAnalytics(firebaseApp))
		}
	}, [])
}

export default useAnalytics
