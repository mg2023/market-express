const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'mg',
  host: 'localhost',
  database: 'market_db',
  password: 'password',
  port: 5432,
});

app.get('/products', (req, res) => {
  const consulta = pool.query('SELECT * FROM products', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
    } else {
      //res.send(`PostgreSQL connected! Current time: ${result.rows[0].now}`);
      console.log('entra aca')
      console.log(result.rows)
      res.status(200).json(result.rows);
    }
  });
});

app.get('/', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
    } else {
      res.send(`PostgreSQL connected! Current time: ${result.rows[0].now}`);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

