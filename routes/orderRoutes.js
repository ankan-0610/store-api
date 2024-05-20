const express = require("express");
const { createOrder, getOrders, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.delete("/orders/:orderID", deleteOrder);

module.exports = router;