const express = require('express');
const router = require('./src/routes/routes')
require('dotenv').config()

const app = express();
const port = (process.env.PORT | 3000);

const cors = require('cors')
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"], credentials: true, preflightContinue: true }));

app.use(express.json())

app.use((req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  console.log(`${time} --- New request ${req.method}, on path ${req.path}`)
  next();
});

app.use('/', router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app