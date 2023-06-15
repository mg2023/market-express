const express = require('express');
const router = require('./src/routes/routes')
require('dotenv').config()

const app = express();
const port = (process.env.PORT | 3000);

console.log(process.env)

const cors = require('cors')
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type", "Authorization"], credentials: true, preflightContinue: true }));

// app.use(cors())
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(express.json())

app.use((req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  console.log(`${time} --- Recibe llamada de tipo ${req.method}, en la ruta ${req.path}`)
  next();
});

app.use('/', router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app