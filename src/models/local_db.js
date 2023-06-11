const { Pool } = require('pg');

const pool = new Pool({
  user: 'mg',
  host: 'localhost',
  database: 'market_db',
  password: 'password',
  port: 5432,
});

module.exports = pool;