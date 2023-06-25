const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi  = require("swagger-ui-express")

const options = {
	definition: {
		openapi: "3.0.0",
		info: { title: "Marketplace", version: "1.0.0"}
	},
	apis: ["./server/server.js","./routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, port) => {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
	app.get('/doc.json',(req, res) => {
		res.setHeader('Content-Type','application/json')
		res.send(swaggerDocs)
	})

	console.log(`Version 1 swagger docs  on http://localhost:${port}`)
}

module.exports = {swaggerDocs}