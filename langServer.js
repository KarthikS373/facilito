// IMPORTS
const LZString = require('lz-string')
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

const currentPath = path.resolve('./lang/strings-dev.json')

// GUARDAR DICCIONARIO
const writeOnDict = (stringsDict, res, replace, dev = true, sendRes = false) => {
	if (fs.existsSync(currentPath)) {
		const data = fs.readFileSync(currentPath)

		// NUEVO DICCIONARIO
		const newStrings = replace
			? stringsDict
			: {
					...stringsDict,
					// @ts-ignore
					...JSON.parse(data),
			  }

		// ESCRIBIR ARCHIVO
		fs.writeFileSync(
			dev ? currentPath : currentPath.replace('-dev', ''),
			JSON.stringify(newStrings, null, dev ? '\t' : undefined)
		)

		// RESPUESTA
		if (sendRes) res.json({ status: 'ok' })

		// EL ARCHIVO NO EXISTE
	} else if (sendRes) res.json({ status: 'error', msg: "This file doesn't exists" })
}

// ESCRIBIR DICCIONARIO
app.post('/write', (req, res) => {
	// PROPS
	const { body } = req
	const { stringsDict } = body

	// REESCRIBIR STRINGS
	writeOnDict(stringsDict, res, false)
	buildProduction(res)
})

// OPTIMIZAR
app.get('/delete', (_req, res) => {
	writeOnDict({}, res, true, true, false)
	writeOnDict({}, res, true, false, true)
})

// OPTIMIZAR
const buildProduction = (res) => {
	// PARSER
	const data = fs.readFileSync(currentPath)
	const parsedData = JSON.parse(data)

	// CREAR NUEVO OBJETO
	const newDict = Object.fromEntries(
		Object.keys(parsedData).map((key) => [LZString.compressToBase64(key), parsedData[key]])
	)

	// GUARDAR
	writeOnDict(newDict, res, true, false, true)
}
app.get('/build', (_req, res) => buildProduction(res))

// INICIAR APP
app.listen(4000, () => {
	console.log('Portray server ready...')
})
