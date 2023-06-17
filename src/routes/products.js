const express = require('express');
const router = express.Router();

const { getProducts, getProductById, addProduct, deleteProductById, updateProduct } = require('../models/local_db')

router.get('/', async (req, res) => {
  console.log('Llega a la ruta get products')
  await getProducts(req, res)
});

router.post("/", async (req, res) => {
  await addProduct(req, res)
});

router.delete("/:id", async (req, res) => {
  const product = req.body;
  const { id } = req.params;
  const product_bd = await getProductById(id)

  if (id != product.id)
    return res
      .status(400)
      .send({
        message: "El id del parámetro no coincide con el id del producto recibido",
      });

  console.log(product_bd)
  if (product_bd.length > 0) {

    await deleteProductById(id)
    res
      .status(204)
      .send({ message: "Producto eliminado" });

  } else {
    res
      .status(404)
      .send({ message: "No se encontró ningún producto con ese id" });
  }
});

router.put("/:id", async (req, res) => {
  const { productId, fieldName, fieldValue } = req.body;
  const { id } = req.params;
  const product_bd = await getProductById(id)

  if (id != productId)
    return res
      .status(400)
      .send({
        message: "El id del parámetro no coincide con el id del producto recibido",
      });



  if (product_bd.length > 0) {
    console.log(product_bd[0].id)
    await updateProduct(id, fieldName, fieldValue)
    res
      .status(201)
      .send({ message: "Producto actualizado" });

  } else {
    res
      .status(404)
      .send({ message: "No se encontró ningún producto con ese id" });
  }
});

// router.get('/v1/', async (req, res) => {
//   await getDateFromDataBase(req, res)
// });

module.exports = router;