// test/integration/storeRoutes.test.js

import request from "supertest";
import app from "../../app";
import Store from "../../models/Store";
import mongoose from "mongoose";

describe("Store Routes", () => {
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

  describe("POST /stores", () => {
    it("should create a new store", async () => {
      const response = await request(app)
        .post("/api/stores")
        .send({ name: "Store1", location: "Location1" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: "Store1",
          location: "Location1",
        })
      );
    });
  });

  describe("GET /stores", () => {
    it("should return all stores", async () => {
      const response = await request(app).get("/api/stores");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("DELETE /stores/:storeId", () => {
    it("should delete a store", async () => {
      const store = new Store({ name: "Store1", location: "Location1" });
      await store.save();

      const response = await request(app).delete(`/api/stores/${store._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Store deleted successfully" });
    });
  });
});
