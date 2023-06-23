const express = require("express");
const router = express.Router();

const { verificarToken } = require("../middleware");
const { getPreferences, setPreferences } = require("../models/local_db");

router.get("/", verificarToken, async (req, res) => {
  await getPreferences(req, res);
});

router.post("/", verificarToken, async (req, res) => {
  await setPreferences(req, res);
});

module.exports = router;
