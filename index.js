/* eslint-disable node/handle-callback-err */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const fs = require('fs')

let finalD = {}
fs.readFile('./backup.json', (err, d) => {
	const data = JSON.parse(d)
	finalD = data.users
	Object.keys(finalD ?? {}).forEach((email) => {
		if (finalD[email].business)
			finalD[email] = {
				...finalD[email],
				phone: data.business[finalD[email].business]?.phone ?? '',
			}
	})
	fs.writeFile('./users.json', JSON.stringify(finalD), {}, () => {
		console.log('write')
	})
})
