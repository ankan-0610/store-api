const Product = require("../models/Product");
const Store = require("../models/Store");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, storeName } = req.body;

    // Find store by name
    const store = await Store.findOne({ name: storeName });

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Create new product with store ID
    const newProduct = new Product({
      name,
      price,
      store: store._id
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { storeName, productName } = req.query;

    const store = await Store.findOne({ name: storeName });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
      store: store._id,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("store");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};