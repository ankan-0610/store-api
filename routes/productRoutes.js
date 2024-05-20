const express = require("express");
const {
  createProduct,
  getProducts,
  searchProducts,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getProducts);
// Search Products
router.get('/products/search', searchProducts);
// Delete Product
router.delete('/products/:productId', deleteProduct);

module.exports = router;