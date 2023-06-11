const express = require('express');
const router = express.Router();
const { verificarExistenciaDeCredenciales, verificarToken, logEnElTerminal } = require('../middleware')
const { verificarEmail, registrarUsuario, verificarCredenciales, leerRegistro, nowTestDb, products } = require('../models/local_db')

const db = require('../models/local_db');

const requiredFields = ['email', 'password', 'first_name', 'last_name','telephone'];


// 1. REGISTRAR y obtener usuarios de la base de datos (1.5 puntos)
router.post('/usuarios', logEnElTerminal, verificarExistenciaDeCredenciales(requiredFields), async (req, res) => {
  try {
    const usuario = req.body
    console.log(usuario.email)
    const status = await verificarEmail(usuario.email)
    console.log(status)
    //if (status === true) {
    //  throw { code: 401, message: "Usuario ya existe" }
    //}

    //await registrarUsuario(usuario)
    res.send("Usuario creado con éxito")
  }
  catch (error) {
    //Se envia el mensaje de error aunque el front no lo considere, pero seria bueno que lo hiciera.
    res.status(error.code || 500).send(error.message)
  }
})

router.get('/products', async (req, res) => {

  await products(req, res)


});

router.get('/test', async (req, res) => {
  await nowTestDb(req, res)
});

module.exports = router;