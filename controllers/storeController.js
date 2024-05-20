const Store = require("../models/Store");

exports.createStore = async (req, res) => {
  try {
    const store = new Store({
      name: req.body.name,
      location: req.body.location,
    });

    await store.save();
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchStores = async (req, res) => {
  try {
    const stores = await Store.find({
      name: { $regex: req.query.name, $options: "i" },
      location: { $regex: req.query.location, $options: "i" },
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    const store = await Store.findByIdAndDelete(storeId);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};