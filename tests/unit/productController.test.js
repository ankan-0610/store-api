// test/unit/productController.test.js

import { jest } from "@jest/globals";
import Product from "../../models/Product";
import Store from "../../models/Store";
import * as productController from "../../controllers/productController";

jest.mock("../../models/Product");
jest.mock("../../models/Store");

describe("Product Controller", () => {
  describe("createProduct", () => {
    it("should create a new product", async () => {
      const req = {
        body: { name: "Product1", price: 10, storeName: "Store1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findOne.mockResolvedValue({ _id: "1", name: "Store1" });
      Product.prototype.save.mockResolvedValue({
        name: "Product1",
        price: 10,
        store: "1",
      });

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        name: "Product1",
        price: 10,
        store: "1",
      });
    });
  });

  describe("searchProducts", () => {
    it("should return products for a store", async () => {
      const req = { query: { storeName: "Store1", productName: "Product" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findOne.mockResolvedValue({ _id: "1", name: "Store1" });
      Product.find.mockResolvedValue([
        { name: "Product1", price: 10, store: "1" },
      ]);

      await productController.searchProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { name: "Product1", price: 10, store: "1" },
      ]);
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product", async () => {
      const req = { params: { productId: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.findByIdAndDelete.mockResolvedValue({ _id: "1" });

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Product deleted successfully",
      });
    });

    it("should return 404 if product not found", async () => {
      const req = { params: { productId: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.findByIdAndDelete.mockResolvedValue(null);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    });
  });
});
