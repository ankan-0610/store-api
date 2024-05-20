// test/integration/productRoutes.test.js

import request from "supertest";
import app from "../../app";
import Product from "../../models/Product";
import Store from "../../models/Store";
import mongoose from "mongoose";

describe("Product Routes", () => {
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

  describe("POST /products", () => {
    it("should create a new product", async () => {
      const store = new Store({ name: "Store1", location: "Location1" });
      await store.save();

      const response = await request(app)
        .post("/api/products")
        .send({ name: "Product1", price: 10, storeName: "Store1" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: "Product1",
          price: 10,
          store: expect.any(String),
        })
      );
    });
  });

  describe("GET /products", () => {
    it("should return all products", async () => {
      const response = await request(app).get("/api/products");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("GET /products/search", () => {
    it("should return products matching the query", async () => {
      const store = new Store({ name: "Store1", location: "Location1" });
      await store.save();

      const product = new Product({
        name: "Product1",
        price: 10,
        store: store._id,
      });
      await product.save();

      const response = await request(app)
        .get("/api/products/search")
        .query({ storeName: "Store1", productName: "Product" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("DELETE /products/:productId", () => {
    it("should delete a product", async () => {
      const store = new Store({ name: "Store1", location: "Location1" });
      await store.save();

      const product = new Product({
        name: "Product1",
        price: 10,
        store: store._id,
      });
      await product.save();

      const response = await request(app).delete(
        `/api/products/${product._id}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Product deleted successfully",
      });
    });
  });
});
