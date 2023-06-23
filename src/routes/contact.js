const express = require("express");
const router = express.Router();

const { verificarToken } = require("../middleware");
const { getContactRequest, setContactRequest, getContactById,  deleteContactById} = require("../models/local_db");

router.get("/", verificarToken, async (req, res) => {
  await getContactRequest(req, res);
});

router.post("/", verificarToken, async (req, res) => {
  console.log("llega a la ruta post contact");
  await setContactRequest(req, res);
});

// router.delete("/:id", verificarToken, async (req, res) => {
//   console.log("llega a la ruta post contact");
//   await deleteContactById(req, res);
// });


router.delete("/:id",verificarToken, async (req, res) => {
  const { id: contactId } = req.body;
  const { id } = req.params;

  const contact_bd = await getContactById(id);

  if (id != contactId)
    return res.status(400).send({
      message: "The parameter id does not match the received contact request id",
    });

  if (contact_bd.length > 0) {
    await deleteContactById(id);
    res.status(200).send({ message: "The contact request has been deleted" });
  } else {
    res.status(404).send({ message: "No contact request found with that ID" });
  }
});

module.exports = router;
