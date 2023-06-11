const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'mg',
  host: 'localhost',
  database: 'market_db',
  password: 'password',
  port: 5432,
});


const nowTestDb = async (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
    } else {
      res.send(`PostgreSQL connected! Current time: ${result.rows[0].now}`);
    }
  });
}

const products = async (req, res) => {
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
}


const verificarEmail = async (email) => {
  pool.query('SELECT * FROM customers', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error executing query');
    } else {
      //res.send(`PostgreSQL connected! Current time: ${result.rows[0].now}`);
      console.log('entra aca')
      console.log(result.rows)
      return true
      //res.status(200).json(result.rows);
    }
  });
}



const registrarUsuario = async (usuario) => {
  let { email, password, rol, lenguage } = usuario
  if (email, password, rol, lenguage) {

    // 5. Encriptar las contraseñas al momento de registrar nuevos usuarios (3 puntos)
    const passwordEncriptada = bcrypt.hashSync(password, 10)
    const values = [email, passwordEncriptada, rol, lenguage]
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)"
    await pool.query(consulta, values)
  }
}



const verificarCredenciales = async (email, password) => {
  const values = [email]
  const consulta = "SELECT * FROM usuarios WHERE email = $1"
  const { rows: [usuario], rowCount } = await pool.query(consulta, values)

  if (usuario === undefined || usuario === '')
    throw { code: 401, message: "Usuario no encontrado" }

  const { password: passwordEncriptada } = usuario

  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
  if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Contraseña incorrecta" }
}



const leerRegistro = async (email) => {
  const values = [email]
  const consulta = "SELECT email,  rol, lenguage FROM usuarios WHERE email = $1"
  const { rows } = await pool.query(consulta, values)
  return (rows[0])
}

module.exports = { verificarEmail, registrarUsuario, verificarCredenciales, leerRegistro, nowTestDb , products}
