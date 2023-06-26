const express = require("express");
const router = express.Router();

const { verificarToken } = require("../middleware");
const { getContactRequest, setContactRequest, getContactById,  deleteContactById} = require("../models/local_db");

/**
 * @swagger
 * /api/v1/contacts:
 *   get:
 *     summary: Get all contact requests
 *     description: Retrieve all contact requests from the database
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact requests retrieved successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Error occurred while retrieving contact requests
 */
router.get("/", verificarToken, async (req, res) => {
  await getContactRequest(req, res);
});


/**
 * @swagger
 * /api/v1/contacts:
 *   post:
 *     summary: Create contact request
 *     description: Create a new contact request
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "jhon"
 *                 email:
 *                   type: string
 *                   example: "jhon@gmail.com"
 *                 comments:
 *                   type: string
 *                   example: "Hello!, I have a question..."
 * 
 *     responses:
 *       201:
 *         description: Contact request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact request submitted successfully"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Error occurred while creating the contact request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the contact request"
 */
router.post("/", verificarToken, async (req, res) => {
  await setContactRequest(req, res);
});

/**
 * @swagger
 * /api/v1/contacts/{id}:
 *   delete:
 *     summary: Delete contact request
 *     description: Delete a contact request by ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the contact request to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact request deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The contact request has been deleted"
 *       400:
 *         description: Parameter ID does not match the received contact request ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The parameter id does not match the received contact request id"
 *       404:
 *         description: No contact request found with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No contact request found with that ID"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
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
