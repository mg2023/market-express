const { Pool } = require('pg');
require('dotenv').config()
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

// const pool = new Pool({

//   host: process.env.LOCAL_DB_HOST,
//   user: process.env.LOCAL_DB_USER,
//   password: process.env.LOCAL_DB_PASSWORD,
//   database: process.env.LOCAL_DB_NAME,


//   // user: 'postgres',
//   // host: 'localhost',
//   // //database: 'market_db',
//   // database: 'marketplace',
//   // // password: 'your_password1',
//   // password: 'ok',
//   port: 5432,
// });

const getDateFromDataBase = async (req, res) => {
  try {
    const result = pool.query('SELECT NOW()')
    res.status(200).send(`PostgreSQL connected! Current time: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("getDateFromDataBase: Error occurred while querying database");
  }
}

const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products')
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("getProducts: Error occurred while querying database");
  }
}

const getProductById = async (id) => {
  try {
    const values = [id]
    const query = 'SELECT * FROM products WHERE id= $1'
    const result = await pool.query(query, values)
    return (result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("getProductById: Error occurred while querying database");
  }
}

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    let { product_name, descrip, cost, price, stock_quantity, url_img, stars_quantity, category, is_new, is_special_offer } = product

    if (product_name, descrip, cost, price, stock_quantity, url_img, stars_quantity, category, is_new, is_special_offer) {

      const values = [product_name, descrip, cost, price, stock_quantity, url_img, stars_quantity, category, is_new, is_special_offer]
      const query = "INSERT INTO products (product_name, descrip, cost, price, stock_quantity,url_img,stars_quantity, category, is_new, is_special_offer, created_at, modified_at) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10, NOW(), NOW())"

      const result = await pool.query(query, values)
      res.status(201).json({ code: 201, message: "Product added" });
      // console.log(result)
      // return (result.rows);
    }
    else {
      console.log('faltan campos')
      // res.status(400).json({ code: 400, message: "Empty fields " });
      res.status(500).send("addProduct: Error occurred while querying database");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("addProduct: Error occurred while querying database");
  }
}

const deleteProductById = async (id) => {
  try {

      const values = [id]
      const query = "DELETE FROM products WHERE id=$1"

      const result = await pool.query(query, values)
      //console.log(result)
      return 204 
 
  } catch (error) {
    console.error(error);
    return 500 
    //res.status(500).send("deleteProductById: Error occurred while querying database");
  }
}

const verificarEmail = async (email) => {
  try {
    const values = [email]
    const consulta = "SELECT * FROM customers WHERE email = $1"
    const { rows: [table] } = await pool.query(consulta, values)

    if (table === undefined || table === '')
      return false
    else
      return true
  } catch (error) {
    console.error(error);
    res.status(500).send("verificarEmail: Error occurred while querying database");
  }
}

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
}

const verifyCredentials = async (email, password) => {
  const values = [email]
  const consulta = "SELECT * FROM customers WHERE email = $1"
  const { rows: [usuario], rowCount } = await pool.query(consulta, values)

  if (usuario === undefined || usuario === '')
    throw { code: 401, message: "Usuario no encontrado" }

  const { password: passwordEncriptada } = usuario

  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
  if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Contraseña incorrecta" }
}

const getPreferences = async (req, res) => {
  try {
    const query = "SELECT * FROM my_preferences"
    const result = await pool.query(query)
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("getPreferences: Error occurred while querying database");
  }
}

const setPreferences = async (req, res,) => {
  try {
    const { url_img_banner, url_img_logo } = req.body
    const values = [url_img_banner, url_img_logo]
    const query = "INSERT INTO my_preferences (url_img_banner,url_img_logo ) VALUES ($1,$2)"
    await pool.query(query, values)
    res.status(201).send("setPreferences: preferences updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("setPreferences: Error occurred while querying database");
  }
}

const getOrders = async (req, res) => {
  try {
    const query = "SELECT * FROM orders"
    const result = await pool.query(query)
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("getOrders: Error occurred while querying database");
  }
}

const setOrders = async (req, res,) => {
  try {
    const { customer_id, total_amount } = req.body
    const values = [customer_id, total_amount]
    const query = "INSERT INTO orders (customer_id,total_amount, created_at) VALUES ($1,$2, NOW())"
    await pool.query(query, values)
    res.status(201).send("setOrders: orders updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("setOrders: Error occurred while querying database");
  }
}

module.exports = { verificarEmail, registrarUsuario, verifyCredentials, getDateFromDataBase, getProducts, getPreferences, setPreferences, getOrders, setOrders, getProductById, addProduct, deleteProductById }
