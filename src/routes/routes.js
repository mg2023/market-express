const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { verificarExistenciaDeCredenciales, verificarToken } = require('../middleware')
const { verificarEmail, registrarUsuario, verifyCredentials, getDateFromDataBase, getProducts, getPreferences, setPreferences, getOrders, setOrders, getProductById, addProduct, deleteProductById, updateProduct } = require('../models/local_db')

const requiredFields = ['email', 'password', 'first_name', 'last_name', 'telephone'];

router.post('/v1/register', verificarExistenciaDeCredenciales(requiredFields), async (req, res) => {
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

router.post('/v1/login', async (req, res) => {
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

router.get('/v1/products', async (req, res) => {
  await getProducts(req, res)
});

router.post("/v1/products", async (req, res) => {
  await addProduct(req, res)
});

router.delete("/v1/products/:id", async (req, res) => {
  const product = req.body;
  const { id } = req.params;
  const product_bd = await getProductById(id)

  if (id != product.id)
    return res
      .status(400)
      .send({
        message: "El id del parámetro no coincide con el id del producto recibido",
      });

  console.log(product_bd)
  if (product_bd.length > 0) {
    
    await deleteProductById(id)
    res
      .status(204)
      .send({ message: "Producto eliminado" });

  } else {
    res
      .status(404)
      .send({ message: "No se encontró ningún producto con ese id" });
  }
});

router.get('/v1/preferences', verificarToken, async (req, res) => {
  await getPreferences(req, res)
})

router.post('/v1/preferences', verificarToken, async (req, res) => {
  await setPreferences(req, res)
})

router.get('/v1/orders', verificarToken, async (req, res) => {
  await getOrders(req, res)
})

router.post('/v1/orders', verificarToken, async (req, res) => {
  await setOrders(req, res)
})

router.get('/v1/', async (req, res) => {
  await getDateFromDataBase(req, res)
});

router.put("/v1/products/:id", async (req, res) => {
  const { productId , fieldName, fieldValue } = req.body;
  const { id } = req.params;
  const  product_bd = await getProductById(id)

  if (id != productId )
      return res
          .status(400)
          .send({
              message: "El id del parámetro no coincide con el id del producto recibido",
          });



  if (product_bd.length  > 0) {
    console.log(product_bd[0].id)
    await updateProduct(id, fieldName, fieldValue)
    res
    .status(201)
    .send({ message: "Producto actualizado" });

  } else {
      res
          .status(404)
          .send({ message: "No se encontró ningún producto con ese id" });
  }
});

module.exports = router;