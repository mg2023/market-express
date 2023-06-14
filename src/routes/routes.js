const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { verificarExistenciaDeCredenciales, verificarToken, logEnElTerminal } = require('../middleware')
const { verificarEmail, registrarUsuario, verifyCredentials, getDateFromDataBase, getProducts, getPreferences, setPreferences, getOrders, setOrders } = require('../models/local_db')

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

module.exports = router;