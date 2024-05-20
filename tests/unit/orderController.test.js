// test/unit/orderController.test.js

import { jest } from "@jest/globals";
import Order from "../../models/Order";
import Product from "../../models/Product";
import * as orderController from "../../controllers/orderController";

jest.mock("../../models/Order");
jest.mock("../../models/Product");

describe("Order Controller", () => {
  describe("createOrder", () => {
    it("should create a new order", async () => {
      const req = {
        body: {
          productIds: ["60c72b2f9b1d8c1a4c8a4c8b", "60c72b2f9b1d8c1a4c8a4c8c"],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.find.mockResolvedValue([
        { _id: "60c72b2f9b1d8c1a4c8a4c8b", price: 10 },
        { _id: "60c72b2f9b1d8c1a4c8a4c8c", price: 20 },
      ]);

      Order.prototype.save.mockResolvedValue();

      await orderController.createOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          totalAmount: 30,
          products: req.body.productIds,
        })
      );
    });
  });

  describe("getOrders", () => {
    it("should return all orders", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
      };

      const orders = [{ _id: "1", totalAmount: 30, products: [] }];
      Order.find.mockResolvedValue(orders);

      await orderController.getOrders(req, res);

      expect(res.json).toHaveBeenCalledWith(orders);
    });
  });

  describe("deleteOrder", () => {
    it("should delete an order", async () => {
      const req = { params: { orderId: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Order.findByIdAndDelete.mockResolvedValue({ _id: "1" });

      await orderController.deleteOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Order deleted successfully",
      });
    });

    it("should return 404 if order not found", async () => {
      const req = { params: { orderId: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Order.findByIdAndDelete.mockResolvedValue(null);

      await orderController.deleteOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Order not found" });
    });
  });
});
