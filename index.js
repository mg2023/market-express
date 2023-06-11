const express = require('express');
const routes = require('./src/routers/routes')
const app = express();
const port = 3000;

const cors = require('cors')
app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
  console.log('Middleware global ejecutado');
  next();
});

// Utilizar la ruta de ejemplo
app.use('/', routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

