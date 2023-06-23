const express = require("express");
const router = express.Router();

const { verificarToken } = require("../middleware");
const { getContactRequest, setContactRequest } = require("../models/local_db");

router.get("/", verificarToken, async (req, res) => {
  await getContactRequest(req, res);
});

router.post("/", verificarToken, async (req, res) => {
  console.log("llega a la ruta post contact");
  await setContactRequest(req, res);
});

module.exports = router;
