const express = require('express');
const router = express.Router();

const { verificarToken } = require('../middleware')
const { getOrders, setOrders } = require('../models/local_db')

router.get('/', verificarToken, async (req, res) => {
    await getOrders(req, res)
})

router.post('/', verificarToken, async (req, res) => {
    await setOrders(req, res)
})

module.exports = router;