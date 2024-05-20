const express = require("express");
const { createStore, searchStores, deleteStore } = require("../controllers/storeController");
const router = express.Router();

router.post("/stores", createStore);
router.get("/stores", searchStores);
router.delete("/stores/:storeID",deleteStore)

module.exports = router;