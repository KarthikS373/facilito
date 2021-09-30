// REACT
import { useEffect } from 'react'

// UTILS
import getFirebase from 'keys/firebase'

/**
 * Hook de Analytics
 * @description Inicia firebase analytics de manera segura (client side)
 */
const useAnalytics = (): void => {
	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			getFirebase().then(async (firebaseApp) => {
				const { initializeAnalytics } = await import('firebase/analytics')
				initializeAnalytics(firebaseApp)
			})
		}
	}, [])
}

export default useAnalytics
