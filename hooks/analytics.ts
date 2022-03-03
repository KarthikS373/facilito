// REACT
import { useEffect } from 'react'

// UTILS
import getFirebase from 'keys/firebase'

/**
 * Hook de Analytics
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
