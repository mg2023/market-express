const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'market_db',
  password: 'your_password1',
  port: 5432,
});

// const pool = new Pool({
//   user: 'mg',
//   host: 'localhost',
//   database: 'market_db',
//   password: 'password',
//   port: 5432,
// });


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
      res.status(200).json(result.rows);
    }
  });
}

const verificarEmail= async (email) => {
    const values = [email]
    const consulta = "SELECT * FROM customers WHERE email = $1"
    const { rows: [table] } = await pool.query(consulta, values)

    if (table === undefined || table === '')
        return false
    else
        return true
}

// const registrarUsuario = async (customer) =>{
  
//     const sql = `
//       INSERT INTO customers (
//         email,
//         password,
//         first_name,
//         last_name,
//         telephone,
//         type,
//         created_at,
//         modified_at,
//         deleted_at
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//     `;
  
//     const now = new Date();
//     const time = now.toLocaleTimeString();

//     const result = await pool.query(sql, [
//       customer.email,
//       customer.password,
//       customer.first_name,
//       customer.last_name,
//       customer.telephone,
//       0,
//       time,
//       time,
//       null,
//     ]);
  
//     // await client.end();

//     if (result.rowCount === 1) {
//       console.log("Customer inserted successfully");
//     } else {
//       console.log("Error inserting customer");
//     }
  
//     return result;
//   }
  
  // // Create a customer
  // const customer = {
  //   email: "johndoe@example.com",
  //   password: "password123",
  //   first_name: "John",
  //   last_name: "Doe",
  //   telephone: "123-456-7890",
  //   type: 1,
  //   created_at: new Date(),
  //   modified_at: new Date(),
  //   deleted_at: null,
  // };
  
  // // Insert the customer
  // const result = await insertCustomer(customer);
  



const registrarUsuario = async (customer) => {
  let { email, password, first_name, last_name, telephone } = customer
  console.log(customer)
  if (email, password, first_name, last_name, telephone) {
  
    
    const now = new Date();
    const time = now.toLocaleTimeString();

    // 5. Encriptar las contraseñas al momento de registrar nuevos usuarios (3 puntos)
    const passwordEncriptada = bcrypt.hashSync(password, 10)
    
    const values = [email, passwordEncriptada, first_name, last_name, telephone, 0]
    
    const consulta = "INSERT INTO customers (email, password, first_name, last_name, telephone,type, created_at, modified_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())"
    
    const resultado = await pool.query(consulta, values)
    //console.log(resultado)

  }
  console.log('No esta entrando al if')
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

module.exports = { verificarEmail, registrarUsuario, verificarCredenciales, leerRegistro, nowTestDb, products }
