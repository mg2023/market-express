const express = require('express');
const router = require('./src/routes/routes')


const app = express();
const port = 3000;

const cors = require('cors')
//app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json())


app.use((req, res, next) => {
  console.log('Middleware global ejecutado');
  next();
});

// Utilizar la ruta de ejemplo
app.use('/', router);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

