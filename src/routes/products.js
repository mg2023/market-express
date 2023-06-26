const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProduct,
} = require("../models/local_db");

/**
 * @openapi
 * /api/v1/products/:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get("/", async (req, res) => {
  await getAllProducts(req, res);
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product by the provided ID
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *     responses:
 *       200:
 *         description: Product found
 *       400:
 *         description: Invalid request payload
 *       404:
 *         description: Product not found
 */
router.get("/:id", async (req, res) => {
  const { productId } = req.body;
  const { id } = req.params;

  const product_bd = await getProductById(id);

  if (id != productId)
    return res.status(400).send({
      message: "The parameter id does not match the received product id",
    });

  if (product_bd.length > 0) {
    res.status(200).send(product_bd);
  } else {
    res.status(404).send({ message: "No product found with that ID" });
  }
});

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Add a new product
 *     description: Register a new user with the provided information
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Product added successfully
 *       '400':
 *         description: Empty fields or missing required properties
 *       '500':
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  await addProduct(req, res);
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product with the provided ID
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid request payload
 *       404:
 *         description: Product not found
 */
router.delete("/:id", async (req, res) => {
  const { id: productId } = req.body;
  const { id } = req.params;

  const product_bd = await getProductById(id);

  if (id != productId)
    return res.status(400).send({
      message: "The parameter id does not match the received product id",
    });

  if (product_bd.length > 0) {
    await deleteProductById(id);
    res.status(200).send({ message: "The product has been deleted" });
  } else {
    res.status(404).send({ message: "No product found with that ID" });
  }
});


/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Register a new user with the provided information
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *         example: "123456789"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '400':
 *         description: Invalid request or parameter
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.put("/:id", async (req, res) => {
  const { id } = req.body;
  const { id: productId } = req.params;
  const product_bd = await getProductById(id);

  if (id != productId)
    return res.status(400).send({
      message: "The parameter id does not match the received product id",
    });

  if (product_bd.length > 0) {
    await updateProduct(req, res);
    // res
    //   .status(201)
    //   .send({ message: "Producto actualizado" });
  } else {
    res.status(404).send({ message: "No product found with that ID" });
  }
});

module.exports = router;
