const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { verificarExistenciaDeCredenciales } = require("../middleware");
const {
  verificarEmail,
  registrarUsuario,
  verifyCredentials,
  getUserIdbyEmail,
} = require("../models/local_db");

const requiredFields = [
  "email",
  "password",
  "first_name",
  "last_name",
  "telephone",
];
router.post(
  "/register",
  verificarExistenciaDeCredenciales(requiredFields),
  async (req, res) => {
    try {
      const customer = req.body;
      const status = await verificarEmail(customer.email);
      if (status === true) {
        throw { code: 401, message: "Usuario ya existe" };
      }
      await registrarUsuario(customer);
      res.status(200).send("Usuario creado con éxito");
    } catch (error) {
      console.log(error.message);
      res.status(error.code || 500).send(error.message);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await verifyCredentials(email, password);
    const token = jwt.sign({ email }, "clavesecreta", { expiresIn: "2 days" });
    res.status(200).send({ token });
  } catch (error) {
    //Envia los casos de usuario o contraseña incorrecta
    res.status(error.code || 500).send(error.message);
  }
});

router.get("/getId/:email", async (req, res) => {
  try {
    await getUserIdbyEmail(req, res);
  } catch (error) {
    //Envia los casos de usuario o contraseña incorrecta
    res.status(error.code || 500).send(error.message);
  }
});

module.exports = router;
