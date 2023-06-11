const express = require('express');
const router = express.Router();

const  db  =  require('../models/local_db');

router.get('/products', (req, res) => {
    const consulta = db.query('SELECT * FROM products', (err, result) => {
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
  
  router.get('/test', (req, res) => {
    db.query('SELECT NOW()', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error executing query');
      } else {
        res.send(`PostgreSQL connected! Current time: ${result.rows[0].now}`);
      }
    });
  });

  module.exports = router;