const express = require("express");
const router = express.Router();

const { verificarToken } = require("../middleware");
const { getPreferences, setPreferences } = require("../models/local_db");


/**
 * @swagger
 * /api/v1/preferences:
 *   get:
 *     summary: Get user preferences
 *     description: Retrieve user preferences from the database
 *     tags:
 *       - Preferences
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Error occurred while retrieving user preferences
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while retrieving user preferences"
 */
router.get("/", verificarToken, async (req, res) => {
  await getPreferences(req, res);
});

/**
 * @swagger
 * /api/v1/preferences:
 *   get:
 *     summary: Get user preferences
 *     description: Retrieve user preferences from the database
 *     tags:
 *       - Preferences
 *     responses:
 *       200:
 *         description: User preferences retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPreferences'
 *       500:
 *         description: Error occurred while retrieving user preferences
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while retrieving user preferences"
 */
router.post("/", verificarToken, async (req, res) => {
  await setPreferences(req, res);
});

module.exports = router;
