const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { getDateFromDataBase } = require("./src/models/local_db");
const { apiRouter } = require("./src/server/server");
const {swaggerDocs:  V1SwaggerDocs} = require('./src/swagger')

const app = express();
const port = process.env.PORT | 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  console.log(`${time} --- New request ${req.method}, on path ${req.path}`);
  next();
});




/**
 *	@openapi
 *	/:
 *  	get:
 *    	tags:
 *      	- Get time from database
 *     	responses:
 *      	200:
 *      		description: OK
 *         	content:
 *          	application/json:
 *             	schema:
 *               	type: object
 *               	properties:
 *                 	status:
 *                   	type: string
 *                   	example: OK
 *                 	data:
 *                   	type: array 
 *                   	items: 
 *                     	type: object
 */
app.get("/", async (req, res) => {
  await getDateFromDataBase(req, res);
});

apiRouter(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  V1SwaggerDocs(app, port )
});

module.exports = app;
