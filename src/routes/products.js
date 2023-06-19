const express = require('express');
const router = express.Router();

const { getAllProducts, getProductById, addProduct, deleteProductById, updateProduct } = require('../models/local_db')

router.get('/', async (req, res) => {
  await getAllProducts(req, res)
});

router.get('/:id', async (req, res) => {
  const { productId } = req.body;
  const { id } = req.params;

  const product_bd = await getProductById(id)

  if (id != productId)
    return res
      .status(400)
      .send({
        message: "The parameter id does not match the received product id",
      });

  if (product_bd.length > 0) {
    res
      .status(200)
      .send(product_bd);

  } else {
    res
      .status(404)
      .send({ message: "No product found with that ID" });
  }
});

router.post("/", async (req, res) => {
  await addProduct(req, res)
});

router.delete("/:id", async (req, res) => {
  const { productId } = req.body;
  const { id } = req.params;

  const product_bd = await getProductById(id)

  if (id != productId)
    return res
      .status(400)
      .send({
        message: "The parameter id does not match the received product id",
      });

  if (product_bd.length > 0) {

    await deleteProductById(id)
    res
      .status(204)
      .send({ message: "The product has been deleted" });

  } else {
    res
      .status(404)
      .send({ message: "No product found with that ID" });
  }
});

router.put("/:id", async (req, res) => {

  const { id } = req.body;
  const { id: productId } = req.params;
  const product_bd = await getProductById(id)

  if (id != productId)
    return res
      .status(400)
      .send({
        message: "The parameter id does not match the received product id",
      });

  if (product_bd.length > 0) {

    await updateProduct(req, res)
    // res
    //   .status(201)
    //   .send({ message: "Producto actualizado" });

  } else {
    res
      .status(404)
      .send({ message: "No product found with that ID" });
  }
});

module.exports = router;