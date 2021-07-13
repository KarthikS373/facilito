// IMPORTS
const Express = require('express')
const Cors = require('cors')
const path = require('path')
const fs = require('fs')

// MIDDLEWIRE
const app = Express()
app.use(Express.json())
app.use(
	Cors({
		origin: '*',
	})
)

// ESCRIBIR DICCIONARIO
app.post('/write', (req, res) => {
	// PROPS
	const { body } = req
	const { stringsDict } = body

	// REESCRIBIR STRINGS
	const currentPath = path.resolve('./lang/strings.json')
	if (fs.existsSync(currentPath)) {
		const data = fs.readFileSync(currentPath)

		// NUEVO DICCIONARIO
		const newStrings = {
			...stringsDict,
			// @ts-ignore
			...JSON.parse(data),
		}

		// ESCRIBIR ARCHIVO
		fs.writeFileSync(currentPath, JSON.stringify(newStrings))

		// RESPUESTA
		res.json({ status: 'ok' })

		// EL ARCHIVO NO EXISTE
	} else res.json({ status: 'error', msg: "This file doesn't exists" })
})

// INICIAR APP
app.listen(4000, () => {
	console.log('Portray server ready...')
})
