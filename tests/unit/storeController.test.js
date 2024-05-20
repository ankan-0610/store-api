// test/unit/storeController.test.js

import { jest } from "@jest/globals";
import Store from "../../models/Store";
import * as storeController from "../../controllers/storeController";

jest.mock("../../models/Store");

describe("Store Controller", () => {
  describe("createStore", () => {
    it("should create a new store", async () => {
      const req = { body: { name: "Store1", location: "Location1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.prototype.save.mockResolvedValue({
        name: "Store1",
        location: "Location1",
      });

      await storeController.createStore(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        name: "Store1",
        location: "Location1",
      });
    });
  });

  describe("searchStores", () => {
    it("should return stores matching the query", async () => {
      const req = { query: { name: "Store", location: "Location" } };
      const res = {
        json: jest.fn(),
      };

      const stores = [{ name: "Store1", location: "Location1" }];
      Store.find.mockResolvedValue(stores);

      await storeController.searchStores(req, res);

      expect(res.json).toHaveBeenCalledWith(stores);
    });
  });

  describe("deleteStore", () => {
    it("should delete a store", async () => {
      const req = { params: { storeId: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findByIdAndDelete.mockResolvedValue({ _id: "1" });

      await storeController.deleteStore(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Store deleted successfully",
      });
    });

    it("should return 404 if store not found", async () => {
      const req = { params: { storeId: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findByIdAndDelete.mockResolvedValue(null);

      await storeController.deleteStore(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Store not found" });
    });
  });
});
