const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { verificarExistenciaDeCredenciales, verificarToken, logEnElTerminal } = require('../middleware')
const { verificarEmail, registrarUsuario, verifyCredentials, getDateFromDataBase, getProducts, getPreferences, setPreferences, getOrders, setOrders , getProductById, addProduct} = require('../models/local_db')

const db = require('../models/local_db');

const requiredFields = ['email', 'password', 'first_name', 'last_name', 'telephone'];

router.post('/register', logEnElTerminal, verificarExistenciaDeCredenciales(requiredFields), async (req, res) => {
  try {
    const customer = req.body
    const status = await verificarEmail(customer.email)
    if (status === true) {
      throw { code: 401, message: "Usuario ya existe" }
    }
    await registrarUsuario(customer)
    res.send("Usuario creado con éxito")
  }
  catch (error) {
    console.log(error.message)
    res.status(error.code || 500).send(error.message)
  }
})

router.post('/login', logEnElTerminal, async (req, res) => {
  try {
    const { email, password } = req.body
    await verifyCredentials(email, password)
    const token = jwt.sign({ email }, 'clavesecreta', { expiresIn: "2 days" })
    res.send(token)
  }
  catch (error) {
    //Envia los casos de usuario o contraseña incorrecta
    res.status(error.code || 500).send(error.message)
  }
})

router.get('/products', logEnElTerminal, async (req, res) => {
  await getProducts(req, res)
});

router.post("/products", logEnElTerminal, async (req, res) => {
  await addProduct(req, res)
});

router.get('/preferences', logEnElTerminal, verificarToken, async (req, res) => {
  await getPreferences(req, res)
})

router.post('/preferences', logEnElTerminal, verificarToken, async (req, res) => {
  await setPreferences(req, res)
})

router.get('/orders', logEnElTerminal, verificarToken, async (req, res) => {
  await getOrders(req, res)
})

router.post('/orders', logEnElTerminal, verificarToken, async (req, res) => {
  await setOrders(req, res)
})

router.get('/', logEnElTerminal, async (req, res) => {
  await getDateFromDataBase(req, res)
});




// router.put("/products/:id", async (req, res) => {
//   const product = req.body;
//   const { id } = req.params;
//   const  product_bd = await getProductById(id)
 
//   if (id != product.id)
//       return res
//           .status(400)
//           .send({
//               message: "El id del parámetro no coincide con el id del producto recibido",
//           });
//   if (product_bd.length === 0){
//         return  res
//           .status(404)
//           .send({ message: "No se encontró ningún producto con ese id" });
//   }


//   if (product_bd.length  >= 0) {
//     console.log(product_bd[0].id)
//     await updateProduct(product)
//     res
//     .status(201)
//     .send({ message: "Producto actualizado" });

//   } else {
//       res
//           .status(404)
//           .send({ message: "No se encontró ningún producto con ese id" });
//   }
// });

module.exports = router;