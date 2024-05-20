// test/integration/orderRoutes.test.js

import request from "supertest";
import app from "../../app";
import Order from "../../models/Order";
import Product from "../../models/Product";
import Store from "../../models/Store";
import mongoose from "mongoose";

describe("Order Routes", () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/store-api-test`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe("POST /orders", () => {
    it("should create a new order", async () => {
      const store = new Store({ name: "Store1", location: "Location1" });
      await store.save();

      const product1 = new Product({
        name: "Product1",
        price: 10,
        store: store._id,
      });
      const product2 = new Product({
        name: "Product2",
        price: 20,
        store: store._id,
      });
      await product1.save();
      await product2.save();

      const response = await request(app)
        .post("/api/orders")
        .send({ productIds: [product1._id, product2._id] });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          totalAmount: 30,
          products: expect.any(Array),
        })
      );
    });
  });

  describe("GET /orders", () => {
    it("should return all orders", async () => {
      const response = await request(app).get("/api/orders");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("DELETE /orders/:orderId", () => {
    it("should delete an order", async () => {
      const store = new Store({ name: "Store1", location: "Location1" });
      await store.save();

      const product = new Product({
        name: "Product1",
        price: 10,
        store: store._id,
      });
      await product.save();

      const order = new Order({ products: [product._id], totalAmount: 10 });
      await order.save();

      const response = await request(app).delete(`/api/orders/${order._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Order deleted successfully" });
    });
  });
});
