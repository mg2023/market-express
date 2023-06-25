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

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a user
 *     description: Register a new user with the provided information
 *     tags:
 *       - Users
 *     parameters:
 *       - name: body
 *         in: body
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               format: password
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request payload
 */
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


/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate and login a user
 *     tags:
 *       - Users
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */
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



/**
 * @swagger
 * /api/v1/users/getId/{email}:
 *   get:
 *     summary: Get user ID by email
 *     description: Retrieve the ID of a user based on their email
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: User ID retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: "123456"
 *       500:
 *         description: Error occurred while retrieving the user ID
 */
router.get("/getId/:email", async (req, res) => {
  try {
    await getUserIdbyEmail(req, res);
  } catch (error) {
    //Envia los casos de usuario o contraseña incorrecta
    res.status(error.code || 500).send(error.message);
  }
});

module.exports = router;
