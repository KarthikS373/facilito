/**
 * Obtener posicion
 * @description Obtener posicion de API local
 * @returns
 */
export const getPosition: () => Promise<GeolocationPosition> = () => {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(resolve, (err) => reject(err), {
				enableHighAccuracy: true,
			})
		}
	})
}

/**
 * Reverse geocoding
 * @description API reverse geocoding de google
 * @param lat
 * @param lon
 */
export const reverseGeocoding = async (
	lat: number,
	lon: number
): Promise<{
	address: string
}> => {
	// FETCH
	const gGeocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyDe_C11fr8huOOTrcwAWANAe7JRTtgH13k`
	const gData = await fetch(gGeocodingAPI)
	const gJson = await gData.json()
	let address = ''

	console.log('%cFETCH GOOGLE REVERSE GEOCODING API', 'color:lightblue;font-weight:bold')

	// CREAR DIRECCIÓN
	if (gJson.results[1])
		address = `${gJson.results[1].address_components[0].long_name}, ${gJson.results[1].address_components[2].long_name}, ${gJson.results[1].address_components[3].long_name}`
	return { address }
}

/**
 * Obtener codigo de pais
 */
export const getCountryCode = async (): Promise<string> => {
	const ip = await fetch('https://ipapi.co/json/')
	const json = await ip.json()

	// CÓDIGO
	return json?.country_code || 'US'
}
