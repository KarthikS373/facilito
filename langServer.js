// IMPORTS
const Express = require('express')
const Cors = require('cors')
const path = require('path')
const fs = require('fs')

// MIDDLEWARE
const app = Express()
app.use(Express.json())
app.use(
	Cors({
		origin: '*',
	})
)

const currentPath = path.resolve('./lang/strings.json')

// ESCRIBIR DICCIONARIO
app.post('/write', (req, res) => {
	// PROPS
	const { body } = req
	const { stringsDict } = body

	// REESCRIBIR STRINGS
	if (fs.existsSync(currentPath)) {
		const data = fs.readFileSync(currentPath)

		// NUEVO DICCIONARIO
		const newStrings = {
			...stringsDict,
			// @ts-ignore
			...JSON.parse(data),
		}

		// ESCRIBIR ARCHIVO
		fs.writeFileSync(currentPath, JSON.stringify(newStrings, null, '\t'))

		// RESPUESTA
		res.json({ status: 'ok' })

		// EL ARCHIVO NO EXISTE
	} else res.json({ status: 'error', msg: "This file doesn't exists" })
})

// INICIAR APP
app.listen(4000, () => {
	console.log('Portray server ready...')
})
