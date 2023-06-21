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
    //console.log(process.env)
    const result = await pool.query('SELECT NOW()')
    console.log(result)
    res.status(200).send(`PostgreSQL connected! Current time: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("getDateFromDataBase: Error occurred while querying database");
  }
}

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC')
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
    return error
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


const updateProduct = async (req, res) => {
  try {
    const product = req.body;
    let { id, product_name, descrip, cost, price, stock_quantity, url_img, stars_quantity, category, is_new, is_special_offer } = product;
    if (id, product_name) {
      // if (id, product_name, descrip, cost, price, stock_quantity, url_img, stars_quantity, category, is_new, is_special_offer) {
      const values = [id, product_name, descrip, cost, price, stock_quantity, url_img, stars_quantity, category, is_new, is_special_offer];
      const query = `
        UPDATE products 
        SET 
          product_name = $2,
          descrip = $3,
          cost = $4,
          price = $5,
          stock_quantity = $6,
          url_img = $7,
          stars_quantity = $8,
          category = $9,
          is_new = $10,
          is_special_offer = $11
        WHERE id = $1;
      `;

      const result = await pool.query(query, values);
      return res.status(201).json({ code: 201, message: "Product updated" });
    } else {
      return res.status(400).json({ code: 400, message: "Invalid request body" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "An error occurred while updating the product" });
  }
};

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
    //res.status(500).send("verificarEmail: Error occurred while querying database");
  }
}

const registrarUsuario = async (customer) => {
  let { email, password, first_name, last_name, telephone } = customer
  console.log(customer)
  if (email, password, first_name, last_name, telephone) {

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
    const result = await pool.query(query, values)
    console.log(result)
    res.status(201).send("setOrders: orders updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("setOrders: Error occurred while querying database");
  }
}

const getContactRequest = async (req, res,) => {
  try {
    const query = "SELECT * FROM contact_requests"
    const result = await pool.query(query)
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("setContactRequest: Error occurred while querying database");
  }
}

const setContactRequest = async (req, res,) => {
  try {
    const { name, email, comments } = req.body

    console.log(req.body)
    const values = [name, email, comments]
    const query = "INSERT INTO contact_requests (name, email, comments, created_at) VALUES ($1,$2, $3, NOW())"
    await pool.query(query, values)
    res.status(201).send("setContactRequest: contact request received");
  } catch (error) {
    console.error(error);
    res.status(500).send("setContactRequest: Error occurred while querying database");
  }
}



module.exports = {
  getContactRequest,
  setContactRequest,
  verificarEmail,
  registrarUsuario,
  verifyCredentials,
  getDateFromDataBase,
  getAllProducts,
  getPreferences,
  setPreferences,
  getOrders,
  setOrders,
  getProductById,
  addProduct,
  deleteProductById,
  updateProduct
}
