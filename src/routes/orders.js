const express = require("express");
const router = express.Router();

const { verificarToken } = require("../middleware");
const { getOrders, setOrders } = require("../models/local_db");

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal Server Error
 */

router.get("/", verificarToken, async (req, res) => {
  await getOrders(req, res);
});

router.post("/", verificarToken, async (req, res) => {
  await setOrders(req, res);
});

module.exports = router;
