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
 * @swagger
 * /:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
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
 *         schema:
 *           type: string
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
 *     summary: Add a product
 *     description: Add a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       description: Product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Error occurred while adding the product
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
 *         schema:
 *           type: string
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
 *     summary: Update a product
 *     description: Update a product with the provided ID
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: Product data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             // Include other properties of the product (e.g., name, price, etc.)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid request payload
 *       404:
 *         description: Product not found
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
